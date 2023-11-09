
export function getAstVariableDeclaration(variable, value) {
	return {
		type: 'VariableDeclaration',
		kind: 'const',
		declarations: [{
			type: 'VariableDeclarator',
			id: {
				type: 'Identifier',
				name: variable,
			},
			init: value,
		}],
	};
}
