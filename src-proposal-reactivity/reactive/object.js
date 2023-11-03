
import { reactive }            from '../reactive.js';
import { SYMBOL_KEY_REACTIVE } from '../is-reactive.js';

import { CopperReactive } from './main.js';

export class CopperReactiveObject extends CopperReactive {
	$hasValue(key) {
		return hasOwnProperty(
			this.$value,
			key,
		);
	}

	$getValue(key) {
		return this.$value[key];
	}

	$reactiveContents(target) {
		const result = {};
		for (const [ key, value ] of Object.entries(target)) {
			const value_reactive = reactive(value);
			result[key] = value_reactive;

			// this means that the value became reactive
			if (value !== value_reactive) {
				// so listen for updates
				value_reactive[SYMBOL_KEY_REACTIVE]._add(this);
			}
		}

		return result;
	}

	set(target, key, value) {
		console.log('[CopperReactiveObject] proxy [set]', target, key, value);

		if (value !== target[key]) {
			this.$registerChange(key, value);

			return Reflect.set(
				target,
				key,
				value,
			);
		}

		return true;
	}

	deleteProperty(target, key) {
		console.log('[CopperReactiveObject] proxy [deleteProperty]', target, key);

		this.$registerChange(key);

		return Reflect.deleteProperty(
			target,
			key,
		);
	}
}
