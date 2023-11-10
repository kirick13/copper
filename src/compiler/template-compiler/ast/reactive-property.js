
import { parseRawJsExpression } from '../../utils.js';

export function getAstReactiveProperty(
	element_variable,
	attribute_name,
	attribute_expression,
) {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'reactiveProp',
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
				params: [],
				body: parseRawJsExpression(attribute_expression),
			},
		],
	};
}
