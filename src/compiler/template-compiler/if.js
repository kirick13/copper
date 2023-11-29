
import * as t 						 from '@babel/types';
import { TemplateCompiler }          from '../template-compiler.js';
import { parseRawJsExpression }      from '../utils.js';

function getAstConditionalExpression(ast_test, consequent_number, ast_alternate) {
	return t.conditionalExpression(
		ast_test,
		t.numericLiteral(
			consequent_number,
		),
		ast_alternate,
	);
}

function getAstAlternate() {
	return t.unaryExpression(
		'-',
		t.numericLiteral(1),
		true,
	);
}

function replaceObjectEntries(target, source) {
	for (const key of Object.keys(target)) {
		delete target[key];
	}

	for (const [ key, value ] of Object.entries(source)) {
		target[key] = value;
	}
}

export class TemplateCompilerIf {
	flow;
	context;

	ast_watch;
	#ast_last_alternate;
	asts_outcomes = [];

	constructor(flow, rawjs_test, element, context) {
		this.flow = flow;
		this.context = context;

		this.#ast_last_alternate = getAstAlternate();

		this.ast_watch = getAstConditionalExpression(
			parseRawJsExpression(rawjs_test),
			this.asts_outcomes.length,
			this.#ast_last_alternate,
		);

		this.#addOutcome(element);
	}

	#addOutcome(element) {
		const templateCompiler = new TemplateCompiler(
			this.flow,
			element,
			this.context,
		);

		this.asts_outcomes.push(
			t.arrowFunctionExpression(
				[],
				t.arrayExpression(
					templateCompiler.asts,
				),
			),
		);
	}

	addElseIf(rawjs_test, element) {
		const ast_last_alternate_new = getAstAlternate();

		replaceObjectEntries(
			this.#ast_last_alternate,
			getAstConditionalExpression(
				parseRawJsExpression(rawjs_test),
				this.asts_outcomes.length,
				ast_last_alternate_new,
			),
		);

		this.#ast_last_alternate = ast_last_alternate_new;

		this.#addOutcome(element);
	}

	addElse(element) {
		replaceObjectEntries(
			this.#ast_last_alternate,
			{
				type: 'NumericLiteral',
				value: this.asts_outcomes.length,
			},
		);

		this.#addOutcome(element);
	}

	flush() {
		return t.callExpression(
			t.identifier(
				this.flow._getCopperImportVariable('reactiveIf'),
			),
			[
				t.arrowFunctionExpression(
					[],
					this.ast_watch,
				),
				t.arrayExpression(
					this.asts_outcomes,
				),
			],
		);
	}
}
