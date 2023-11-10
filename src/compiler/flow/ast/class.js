
export function getAstClass(
	class_name,
	ast_state_properties,
	ast_script,
	ast_render,
) {
	return {
		type: 'ExportDefaultDeclaration',
		declaration: {
			type: 'ClassDeclaration',
			id: {
				type: 'Identifier',
				name: class_name,
			},
			superClass: {
				type: 'Identifier',
				name: 'CopperElement',
			},
			body: {
				type: 'ClassBody',
				body: [
					{
						type: 'MethodDefinition',
						kind: 'method',
						key: {
							type: 'Identifier',
							name: '_init',
						},
						value: {
							type: 'FunctionExpression',
							params: [],
							body: {
								type: 'BlockStatement',
								body: [
									...ast_script,
									{
										type: 'ExpressionStatement',
										expression: {
											type: 'CallExpression',
											callee: {
												type: 'MemberExpression',
												object: {
													type: 'Super',
												},
												property: {
													type: 'Identifier',
													name: '_init',
												},
											},
											arguments: [{
												type: 'ObjectExpression',
												properties: ast_state_properties,
											}],
										},
									},
								],
							},
						},
					},
					{
						type: 'MethodDefinition',
						key: {
							type: 'Identifier',
							name: '_render',
						},
						kind: 'method',
						value: {
							type: 'FunctionExpression',
							params: [
								{
									type: 'Identifier',
									name: '$root',
								},
								{
									type: 'ObjectPattern',
									properties: ast_state_properties,
								},
							],
							body: {
								type: 'BlockStatement',
								body: ast_render,
							},
						},
					},
				],
			},
		},
	};
}
