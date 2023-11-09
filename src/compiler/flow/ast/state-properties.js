
export function getAstStateProperties(state_properties) {
	const properties = [];
	for (const variable of state_properties) {
		properties.push({
			type: 'Property',
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

	return {
		type: 'VariableDeclaration',
		kind: 'const',
		declarations: [{
			type: 'VariableDeclarator',
			id: {
				type: 'ObjectPattern',
				properties,
			},
			init: {
				type: 'MemberExpression',
				object: {
					type: 'ThisExpression',
				},
				property: {
					type: 'PrivateIdentifier',
					name: 'state',
				},
			},
		}],
	};
}
