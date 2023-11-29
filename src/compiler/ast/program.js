
export function getAstProgram(body = []) {
	return {
		type: 'Program',
		body,
		sourceType: 'module',
	};
}
