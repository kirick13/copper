
import { Converter }            from '../converter.js';
import { parseRawJsExpression } from '../utils.js';

const regexp_values = /^\s*(?:([$A-Z_a-z][\w$]+)\s*,\s*)?([$A-Z_a-z][\w$]+)\s+of\s+/;

export function converterFor(element, attributes) {
	const attribute_for = attributes.get('for');
	const [ match, variable_index, variable_value ] = regexp_values.exec(attribute_for);
	const expression = attribute_for.slice(match.length);

	const getter_parameters = [{
		type: 'Identifier',
		name: variable_value,
	}];
	if (typeof variable_index === 'string') {
		getter_parameters.push({
			type: 'Identifier',
			name: variable_index,
		});
	}

	let getter_key = {
		type: 'Literal',
		value: null,
	};
	if (attributes.has('key')) {
		getter_key = {
			type: 'ArrowFunctionExpression',
			params: getter_parameters,
			body: parseRawJsExpression(
				attributes.get('key'),
			),
		};
	}

	const converter = new Converter(
		element,
		{
			no_append_on_root: true,
		},
	);

	const ast_return = [];
	for (const variable of converter.variables) {
		ast_return.push({
			type: 'Identifier',
			name: variable,
		});
	}

	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'reactiveFor',
		},
		arguments: [
			{
				type: 'ArrowFunctionExpression',
				params: [],
				body: parseRawJsExpression(expression),
			},
			getter_key,
			{
				type: 'ArrowFunctionExpression',
				params: getter_parameters,
				body: {
					type: 'BlockStatement',
					body: [
						...converter.ast,
						{
							type: 'ReturnStatement',
							argument: {
								type: 'ArrayExpression',
								elements: ast_return,
							},
						},
					],
				},
			},
		],
	};
}
