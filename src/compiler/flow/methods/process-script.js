
export default function () {
	for (
		let index = 0;
		index < this.script_ast.body.length;
		index++
	) {
		const node = this.script_ast.body[index];

		switch (node.type) {
			case 'ImportDeclaration':
				if (node.source.type !== 'Literal') {
					throw new Error('Unexpected node type for source of import, expected Literal.');
				}

				this._saveImport(
					node.source.value,
					node.specifiers,
				);

				this.script_ast.body.splice(
					index,
					1,
				);
				index--;
				break;
			case 'VariableDeclaration':
				for (const declaration of node.declarations) {
					this.script_ast.body.splice(
						index + 1,
						0,
						getAstComponentPropertyDefinition(
							this,
							declaration.id.name,
						),
					);

					index++;
				}
				break;
			case 'FunctionDeclaration':
				this.script_ast.body.splice(
					index + 1,
					0,
					getAstComponentPropertyDefinition(
						this,
						node.id.name,
					),
				);
				break;
			case 'ExportDefaultDeclaration':
				console.warn('Default export from Copper component does not make sense.');
				break;
			case 'ExportAllDeclaration':
				throw new Error('Named exports from Copper component are not supported.');
			case 'ExportNamedDeclaration':
				throw new Error('Named exports from Copper component are not yet supported.');
			// no default
		}
	}
}

function getAstComponentPropertyDefinition(_this, name) {
	_this.state_variables.add(name);

	return {
		type: 'ExpressionStatement',
		expression: {
			type: 'AssignmentExpression',
			operator: '=',
			left: {
				type: 'MemberExpression',
				object: {
					type: 'MemberExpression',
					object: {
						type: 'ThisExpression',
					},
					property: {
						type: 'PrivateIdentifier',
						name: 'state',
					},
				},
				property: {
					type: 'Identifier',
					name,
				},
			},
			right: {
				type: 'Identifier',
				name,
			},
		},
	};
}
