
import { isReactive }           from './is-reactive.js';
import { CopperReactiveObject } from './reactive/object.js';
import {
	isPrimitive,
	isPlainObject }             from './utils.js';

export function reactive(value) {
	if (
		isReactive(value)
		|| isPrimitive(value)
		|| typeof value === 'function'
	) {
		return value;
	}

	// if (value instanceof Set) {
	// 	return new CopperReactiveSet(value).$proxy;
	// }
	// if (value instanceof Map) {
	// 	return new CopperReactiveMap(value).$proxy;
	// }
	if (isPlainObject(value)) {
		return new CopperReactiveObject(value).$proxy;
	}
	// if (Array.isArray(value)) {
	// 	return new CopperReactiveArray(value).$proxy;
	// }

	throw new TypeError('Cannot create reactive object from value');
}
