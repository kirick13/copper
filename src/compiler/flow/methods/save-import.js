
import { createVariableName } from '../../utils.js';

export default function (source_name, specifiers) {
	if (this.imports.has(source_name) !== true) {
		this.imports.set(
			source_name,
			{
				default: null,
				namespace: null,
				named: new Map(),
			},
		);
	}

	const import_data = this.imports.get(source_name);

	for (const node of specifiers) {
		switch (node.type) {
			case 'ImportDefaultSpecifier':
				if (import_data.default === null) {
					import_data.default = {
						variable_outer: createVariableName(),
						variable_inner: node.local.name,
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

				import_data.namespace.variable_inner = node.local.name;
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

				import_data.named.get(node.imported.name).add(node.local.name);
				break;
			// no default
		}
	}
}
