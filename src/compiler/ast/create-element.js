
export function getAstCreateElement(tag_name) {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'el',
		},
		arguments: [{
			type: 'Literal',
			value: tag_name,
		}],
	};
}
