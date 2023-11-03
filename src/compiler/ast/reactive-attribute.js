
import { parse } from 'acorn';

export function getAstReactiveAttribute(element_variable, attribute_name, /* attribute_modifiers, */ attribute_expression) {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'reactiveAttr',
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
			// {
			// 	type: 'ArrayExpression',
			// 	elements: attribute_modifiers.map((modifier) => ({
			// 		type: 'Literal',
			// 		value: modifier,
			// 	})),
			// },
			{
				type: 'ArrowFunctionExpression',
				expression: true,
				params: [],
				body: parse(
					attribute_expression,
					{
						ecmaVersion: 'latest',
					},
				).body[0].expression,
			},
		],
	};
}
