
export function getAstStyle(flow, style) {
	return {
		type: 'BlockStatement',
		body: [
			{
				type: 'VariableDeclaration',
				kind: 'const',
				declarations: [{
					type: 'VariableDeclarator',
					id: {
						type: 'Identifier',
						name: 'el_style',
					},
					init: {
						type: 'CallExpression',
						callee: {
							type: 'Identifier',
							name: flow._getCopperImportVariable('el'),
						},
						arguments: [{
							type: 'StringLiteral',
							value: 'style',
						}],
					},
				}],
			},
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'AssignmentExpression',
					operator: '=',
					left: {
						type: 'MemberExpression',
						object: {
							type: 'Identifier',
							name: 'el_style',
						},
						property: {
							type: 'Identifier',
							name: 'innerText',
						},
					},
					right: {
						type: 'StringLiteral',
						value: style,
					},
					// right: {
					// 	type: 'TemplateLiteral',
					// 	expressions: [],
					// 	quasis: [{
					// 		type: 'TemplateElement',
					// 		value: {
					// 			raw: style,
					// 		},
					// 		tail: true,
					// 	}],
					// },
				},
			},
			{
				type: 'ExpressionStatement',
				expression: {
					type: 'CallExpression',
					callee: {
						type: 'MemberExpression',
						object: {
							type: 'MemberExpression',
							object: {
								type: 'Identifier',
								name: 'document',
							},
							property: {
								type: 'Identifier',
								name: 'head',
							},
						},
						property: {
							type: 'Identifier',
							name: 'append',
						},
					},
					arguments: [
						{
							type: 'Identifier',
							name: 'el_style',
						},
					],
				},
			},
		],
	};
}
