
import { REF_PROBABLY }       from '../../magic-unref.js';
import { createVariableName } from '../../utils.js';

function addNamedImport(import_data_named, name, variable_imported) {
	if (import_data_named.has(name) !== true) {
		import_data_named.set(
			name,
			new Set(),
		);
	}

	import_data_named.get(name).add(variable_imported);
}

export default function flowProcessImport(source_name, specifiers) {
	if (this.script.imports.has(source_name) !== true) {
		this.script.imports.set(
			source_name,
			{
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
				addNamedImport(
					import_data.named,
					'default',
					variable_imported,
				);
				break;
			case 'ImportNamespaceSpecifier':
				import_data.namespace = variable_imported;
				break;
			case 'ImportSpecifier':
				addNamedImport(
					import_data.named,
					node.imported.name,
					variable_imported,
				);
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
