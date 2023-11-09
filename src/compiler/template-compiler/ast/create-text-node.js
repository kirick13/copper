
export function getAstCreateTextNode(text = '') {
	const call_arguments = [];

	if (text.length > 0) {
		call_arguments.push({
			type: 'Literal',
			value: text,
		});
	}

	return {
		type: 'CallExpression',
		callee: {
			type: 'Identifier',
			name: 'text',
		},
		arguments: call_arguments,
	};
}
