
export function getAstNodesAppend(variable_target, variables_source) {
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
			arguments: variables_source.map((variable) => ({
				type: 'Identifier',
				name: variable,
			})),
		},
	};
}
