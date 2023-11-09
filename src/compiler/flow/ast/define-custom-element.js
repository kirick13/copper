
export function getAstDefineCustomElement(tag_name, class_name) {
	return {
		type: 'ExpressionStatement',
		expression: {
			type: 'CallExpression',
			callee: {
				type: 'MemberExpression',
				object: {
					type: 'MemberExpression',
					object: {
						type: 'Identifier',
						name: 'window',
					},
					property: {
						type: 'Identifier',
						name: 'customElements',
					},
				},
				property: {
					type: 'Identifier',
					name: 'define',
				},
			},
			arguments: [
				{
					type: 'Literal',
					value: tag_name,
				},
				{
					type: 'Identifier',
					name: class_name,
				},
			],
		},
	};
}
