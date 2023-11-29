
export function isPlainObject(value) {
	return (
		typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
	);
}
