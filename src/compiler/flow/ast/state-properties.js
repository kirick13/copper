
export function getAstStateProperties(state_properties) {
	const properties = [];
	for (const variable of state_properties) {
		properties.push({
			type: 'ObjectProperty',
			kind: 'init',
			shorthand: true,
			key: {
				type: 'Identifier',
				name: variable,
			},
			value: {
				type: 'Identifier',
				name: variable,
			},
		});
	}

	return properties;
}
