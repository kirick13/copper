
import * as t                 from '@babel/types';
import { createVariableName } from '../../utils.js';

function processNamedImports(named) {
	const properties = [];
	for (const [ variable_exported, variables_inner ] of named.entries()) {
		for (const variable_inner of variables_inner) {
			properties.push(
				t.objectProperty(
					t.identifier(variable_exported),
					t.identifier(variable_inner),
					false,
					variable_exported === variable_inner,
				),
			);
		}
	}

	return properties;
}

export default function flowBuildImports() {
	const ast = [];

	for (
		const [
			source,
			{
				namespace,
				named,
			},
		] of this.script.imports
	) {
		const ast_import_specifiers = [];
		const ast_variable_declarations = [];

		if (namespace === null) {
			for (const [ variable_exported, variables_inner ] of named.entries()) {
				const variable_imported = createVariableName();

				ast_import_specifiers.push(
					t.importSpecifier(
						t.identifier(variable_imported),
						t.identifier(variable_exported),
					),
				);

				for (const variable_inner of variables_inner) {
					ast_variable_declarations.push(
						t.variableDeclarator(
							t.identifier(variable_inner),
							t.identifier(variable_imported),
						),
					);
				}
			}
		}
		else {
			const namespace_imported_variable = createVariableName();

			ast_import_specifiers.push(
				t.importNamespaceSpecifier(
					t.identifier(
						namespace_imported_variable,
					),
				),
			);

			ast_variable_declarations.push(
				t.variableDeclarator(
					t.identifier(namespace),
					t.identifier(namespace_imported_variable),
				),
			);

			{
				const properties = processNamedImports(named);
				if (properties.length > 0) {
					ast_variable_declarations.push(
						t.variableDeclarator(
							t.objectPattern(properties),
							t.identifier(namespace_imported_variable),
						),
					);
				}
			}
		}

		if (ast_import_specifiers.length > 0) {
			ast.push({
				type: 'ImportDeclaration',
				specifiers: ast_import_specifiers,
				source: {
					type: 'StringLiteral',
					value: source,
				},
			});
		}

		if (ast_variable_declarations.length > 0) {
			this.script.ast_imports.push({
				type: 'VariableDeclaration',
				kind: 'const',
				declarations: ast_variable_declarations,
			});
		}
	}

	return ast;
}
