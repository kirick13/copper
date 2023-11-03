
export function isPrimitive(value) {
	return value === null
		|| (
			typeof value !== 'object'
			&& typeof value !== 'function'
		);
}

export function hasOwnProperty(object, key) {
	return Object.prototype.hasOwnProperty.call(object, key);
}

export function isPlainObject(value) {
	return (
		typeof value === 'object'
		&& value !== null
		&& value.constructor === Object
	);
}
