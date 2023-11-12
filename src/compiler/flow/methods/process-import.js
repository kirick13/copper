
import { REF_PROBABLY }       from '../../magic-unref.js';
import { createVariableName } from '../../utils.js';

export default function flowProcessImport(source_name, specifiers) {
	if (this.script.imports.has(source_name) !== true) {
		this.script.imports.set(
			source_name,
			{
				default: null,
				namespace: null,
				named: new Map(),
			},
		);
	}

	const import_data = this.script.imports.get(source_name);

	for (const node of specifiers) {
		const variable_imported = node.local.name;

		switch (node.type) {
			case 'ImportDefaultSpecifier':
				if (import_data.default === null) {
					import_data.default = {
						variable_outer: createVariableName(),
						variable_inner: variable_imported,
					};
				}
				else {
					throw new Error('Found more than one default import from the same source.');
				}
				break;
			case 'ImportNamespaceSpecifier':
				if (import_data.namespace === null) {
					import_data.namespace = {
						variable_outer: createVariableName(),
						variable_inner: null,
					};
				}

				import_data.namespace.variable_inner = variable_imported;
				break;
			case 'ImportSpecifier':
				if (import_data.namespace === null) {
					import_data.namespace = {
						variable_outer: createVariableName(),
						variable_inner: null,
					};
				}

				if (import_data.named.has(node.imported.name) !== true) {
					import_data.named.set(
						node.imported.name,
						new Set(),
					);
				}

				import_data.named.get(node.imported.name).add(variable_imported);
				break;
			// no default
		}

		this.script.variables.add(variable_imported);
		this.script.refs.set(
			variable_imported,
			REF_PROBABLY,
		);
	}
}
