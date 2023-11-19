
import * as t 				    from '@babel/types';
import { TemplateCompiler }     from '../template-compiler.js';
import { parseRawJsExpression } from '../utils.js';
import { REF, magicUnref } from '../magic-unref.js';

const regexp_values = /^\s*(?:([$A-Z_a-z][\w$]+)\s*,\s*)?([$A-Z_a-z][\w$]+)\s+of\s+/;

export function templateCompilerFor(flow, element, attributes) {
	const refs = new Map(flow.script.refs);

	const attribute_for = attributes.get('for');
	const [ match, variable_index, variable_value ] = regexp_values.exec(attribute_for);
	const expression = attribute_for.slice(match.length);

	const getter_parameters = [
		t.identifier(variable_value),
	];
	refs.set(
		variable_value,
		REF,
	);

	if (typeof variable_index === 'string') {
		getter_parameters.push(
			t.identifier(variable_index),
		);
		refs.set(
			variable_index,
			REF,
		);
	}

	let getter_key = t.nullLiteral();
	if (attributes.has('key')) {
		getter_key = t.arrowFunctionExpression(
			getter_parameters,
			parseRawJsExpression(
				attributes.get('key'),
			),
		);
	}

	const templateCompiler = new TemplateCompiler(flow, element);

	return t.callExpression(
		t.identifier(
			flow._getCopperImportVariable('reactiveFor'),
		),
		[
			t.arrowFunctionExpression(
				[],
				parseRawJsExpression(expression),
			),
			getter_key,
			t.arrowFunctionExpression(
				getter_parameters,
				t.arrayExpression(
					magicUnref(
						templateCompiler.asts,
						flow,
					).ast,
				),
			),
		],
	);
}
