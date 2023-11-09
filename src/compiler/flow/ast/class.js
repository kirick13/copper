
export function getAstClass(
	class_name,
	ast_script,
	ast_render,
) {
	return {
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
					type: 'PropertyDefinition',
					key: {
						type: 'PrivateIdentifier',
						name: 'state',
					},
					value: {
						type: 'ObjectExpression',
						properties: [],
					},
				},
				{
					type: 'MethodDefinition',
					key: {
						type: 'Identifier',
						name: 'constructor',
					},
					kind: 'constructor',
					value: {
						type: 'FunctionExpression',
						params: [],
						body: {
							type: 'BlockStatement',
							body: [
								{
									type: 'ExpressionStatement',
									expression: {
										type: 'CallExpression',
										callee: {
											type: 'Super',
										},
										arguments: [],
									},
								},
								{
									type: 'BlockStatement',
									body: ast_script,
								},
							],
						},
					},
				},
				{
					type: 'MethodDefinition',
					key: {
						type: 'Identifier',
						name: 'render',
					},
					kind: 'method',
					value: {
						type: 'FunctionExpression',
						params: [{
							type: 'AssignmentPattern',
							left: {
								type: 'Identifier',
								name: '$root',
							},
							right: {
								type: 'MemberExpression',
								object: {
									type: 'ThisExpression',
								},
								property: {
									type: 'Identifier',
									name: 'root',
								},
							},
						}],
						body: {
							type: 'BlockStatement',
							body: ast_render,
						},
					},
				},
			],
		},
	};
}
