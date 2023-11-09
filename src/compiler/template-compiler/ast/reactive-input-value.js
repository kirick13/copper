
import { parse } from 'acorn';

export function getAstReactiveInputValue(element_variable, attribute_expression) {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'reactiveInputValue',
		},
		arguments: [
			{
				type: 'Identifier',
				name: element_variable,
			},
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
