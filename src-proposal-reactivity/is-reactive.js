
import { isPrimitive } from './utils.js';

export const SYMBOL_KEY_REACTIVE = Symbol('KEY_REACTIVE');

export function isReactive(value) {
	return isPrimitive(value) !== true
		&& value[SYMBOL_KEY_REACTIVE] !== undefined;
}
