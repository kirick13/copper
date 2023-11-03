
export function getAstSetAttribute(element_variable, attribute_name, attribute_value) {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'attr',
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
				type: 'Literal',
				value: attribute_value,
			},
		],
	};
}
