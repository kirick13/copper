
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
				for (const variable of parseVariableDeclaration(node)) {
					this.state_variables.add(variable);
				}
				break;
			case 'FunctionDeclaration':
				this.state_variables.add(node.id.name);

				this.script_ast.body.splice(
					index,
					1,
					{
						type: 'VariableDeclaration',
						kind: 'const',
						declarations: [{
							type: 'VariableDeclarator',
							id: {
								type: 'Identifier',
								name: node.id.name,
							},
							init: {
								type: 'CallExpression',
								callee: {
									type: 'MemberExpression',
									object: node,
									property: {
										type: 'Identifier',
										name: 'bind',
									},
								},
								arguments: [{
									type: 'ThisExpression',
								}],
							},
						}],
					},
				);
				break;
			case 'ExportDefaultDeclaration':
				console.warn('Default export from Copper component does not make sense.');
				break;
			case 'ExportAllDeclaration':
				throw new Error('Named exports from Copper component are not yet supported.');
			case 'ExportNamedDeclaration':
				throw new Error('Named exports from Copper component are not yet supported.');
			// no default
		}
	}
}

function parseVariableDeclaration(node) {
	const variables = [];

	for (const declaration of node.declarations) {
		variables.push(
			...parseVariableDeclaratorId(declaration.id),
		);
	}

	return variables;
}

function parseVariableDeclaratorId(node) {
	const variables = [];

	switch (node.type) {
		case 'Identifier':
			return [ node.name ];
		case 'ArrayPattern':
			for (const element of node.elements) {
				variables.push(
					...parseVariableDeclaratorId(element),
				);
			}
			break;
		case 'ObjectPattern':
			for (const property of node.properties) {
				variables.push(
					...parseVariableDeclaratorId(property),
				);
			}
			break;
		case 'RestElement':
			variables.push(
				...parseVariableDeclaratorId(node.argument),
			);
			break;
		case 'Property':
			variables.push(
				...parseVariableDeclaratorId(node.value),
			);
			break;
		default:
			throw new Error(`Unexpected node type "${node.type}" in VariableDeclarator.id.`);
	}

	return variables;
}
