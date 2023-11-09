
import { getAstVariableDeclaration }    from '../template-compiler/ast/variable-declaration.js';
import { TemplateCompiler }             from '../template-compiler.js';
import {
	createVariableName,
	parseRawJsExpression }              from '../utils.js';

function getAstConditionalExpression(test, consequent_literal, alternate) {
	return {
		type: 'ConditionalExpression',
		test,
		consequent: {
			type: 'Literal',
			value: consequent_literal,
		},
		alternate,
	};
}

function getAstAlternate() {
	return {
		type: 'UnaryExpression',
		operator: '-',
		prefix: true,
		argument: {
			type: 'Literal',
			value: 1,
		},
	};
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
	ast_watch;
	#ast_last_alternate;
	asts_outcomes = [];

	constructor(rawjs_test, element) {
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
			element,
			{
				no_append_on_root: true,
			},
		);

		const ast_return = [];
		for (const variable of templateCompiler.variables) {
			ast_return.push({
				type: 'Identifier',
				name: variable,
			});
		}

		this.asts_outcomes.push({
			type: 'ArrowFunctionExpression',
			params: [],
			body: {
				type: 'BlockStatement',
				body: [
					...templateCompiler.ast,
					{
						type: 'ReturnStatement',
						argument: {
							type: 'ArrayExpression',
							elements: ast_return,
						},
					},
				],
			},
		});
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
				type: 'Literal',
				value: this.asts_outcomes.length,
			},
		);

		this.#addOutcome(element);
	}

	flush() {
		const variable = createVariableName();

		return {
			variable,
			ast: getAstVariableDeclaration(
				variable,
				{
					type: 'CallExpression',
					callee: {
						type: 'Identifier',
						name: 'reactiveIf',
					},
					arguments: [
						{
							type: 'ArrowFunctionExpression',
							params: [],
							body: this.ast_watch,
						},
						{
							type: 'ArrayExpression',
							elements: this.asts_outcomes,
						},
					],
				},
			),
		};
	}
}
