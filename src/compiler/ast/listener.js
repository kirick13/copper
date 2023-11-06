
import { parse } from 'acorn';

export function getAstListener(element_variable, attribute_name, attribute_expression, attribute_modifiers) {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'listen',
		},
		arguments: [
			{
				type: 'Identifier',
				name: element_variable,
			},
			{
				type: 'Literal',
				value: attribute_name,
			},
			{
				type: 'ArrowFunctionExpression',
				expression: true,
				params: [{
					type: 'Identifier',
					name: '$event',
				}],
				body: parse(
					attribute_expression,
					{
						ecmaVersion: 'latest',
					},
				).body[0].expression,
			},
			{
				type: 'ArrayExpression',
				elements: attribute_modifiers.map((modifier) => ({
					type: 'Literal',
					value: modifier,
				})),
			},
		],
	};
}
