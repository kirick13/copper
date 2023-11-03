
export function getAstCreateTextNode(text = '') {
	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'text',
		},
		arguments: [{
			type: 'Literal',
			value: text,
		}],
	};
}
