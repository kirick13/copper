
export function getAstNodeAppend(variable_element, variable_target) {
	return {
		type: 'ExpressionStatement',
		expression: {
			type: 'CallExpression',
			callee: {
				type: 'MemberExpression',
				object: {
					type: 'Identifier',
					name: variable_target,
				},
				property: {
					type: 'Identifier',
					name: 'append',
				},
			},
			arguments: [{
				type: 'Identifier',
				name: variable_element,
			}],
		},
	};
}
