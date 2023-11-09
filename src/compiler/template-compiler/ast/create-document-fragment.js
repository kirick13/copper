
export function getAstCreateDocumentFragment() {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'fragment',
		},
		arguments: [],
	};
}
