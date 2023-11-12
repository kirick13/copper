
export function getAstCopperImports(imports) {
	const specifiers = [];

	for (const [ variable_imported, variable_local ] of imports) {
		specifiers.push({
			type: 'ImportSpecifier',
			imported: {
				type: 'Identifier',
				name: variable_imported,
			},
			local: {
				type: 'Identifier',
				name: variable_local,
			},
		});
	}

	return {
		type: 'ImportDeclaration',
		specifiers,
		source: {
			type: 'StringLiteral',
			value: 'copper',
		},
	};
}
