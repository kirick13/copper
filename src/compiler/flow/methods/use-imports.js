
function processNamedImports(named) {
	const properties = [];
	for (const [ variable_exported, variables_inner ] of named.entries()) {
		for (const variable_inner of variables_inner) {
			properties.push({
				type: 'Property',
				kind: 'init',
				shorthand: variable_exported === variable_inner,
				key: {
					type: 'Identifier',
					name: variable_exported,
				},
				value: {
					type: 'Identifier',
					name: variable_inner,
				},
			});
		}
	}

	return properties;
}

export default function () {
	const ast_imports = [];

	for (
		const [
			source,
			{
				default: default_import,
				namespace,
				named,
			},
		] of this.imports
	) {
		const ast_import_specifiers = [];
		const ast_variable_declarations = [];

		if (default_import !== null) {
			ast_import_specifiers.push({
				type: 'ImportDefaultSpecifier',
				local: {
					type: 'Identifier',
					name: default_import.variable_outer,
				},
			});

			ast_variable_declarations.push({
				type: 'VariableDeclarator',
				id: {
					type: 'Identifier',
					name: default_import.variable_inner,
				},
				init: {
					type: 'Identifier',
					name: default_import.variable_outer,
				},
			});
		}

		if (namespace !== null) {
			ast_import_specifiers.push({
				type: 'ImportNamespaceSpecifier',
				local: {
					type: 'Identifier',
					name: namespace.variable_outer,
				},
			});

			if (namespace.variable_inner !== null) {
				ast_variable_declarations.push({
					type: 'VariableDeclarator',
					id: {
						type: 'Identifier',
						name: namespace.variable_inner,
					},
					init: {
						type: 'Identifier',
						name: namespace.variable_outer,
					},
				});
			}

			{
				const properties = processNamedImports(named);

				if (properties.length > 0) {
					ast_variable_declarations.push({
						type: 'VariableDeclarator',
						id: {
							type: 'ObjectPattern',
							properties,
						},
						init: {
							type: 'Identifier',
							name: namespace.variable_outer,
						},
					});
				}
			}
		}

		if (ast_import_specifiers.length > 0) {
			ast_imports.push({
				type: 'ImportDeclaration',
				specifiers: ast_import_specifiers,
				source: {
					type: 'Literal',
					value: source,
				},
			});
		}

		if (ast_variable_declarations.length > 0) {
			this.ast_pseudo_imports.push({
				type: 'VariableDeclaration',
				kind: 'const',
				declarations: ast_variable_declarations,
			});
		}
	}

	this.result_ast_body.push(...ast_imports);
}
