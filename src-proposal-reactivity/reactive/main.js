
import { CopperBase }          from '../base.js';
import { SYMBOL_KEY_REACTIVE, isReactive } from '../is-reactive.js';
import { hasOwnProperty }      from '../utils.js';
import { nextTick }            from '../utils/next-tick.js';

// import { CopperReactiveObject } from './object.js';

const SYMBOL_NO_VALUE = Symbol('NO_VALUE');

export class CopperReactive extends CopperBase {
	#changes = new Map();

	$value;
	$proxy;

	constructor(value) {
		super();

		this.$value = this.$reactiveContents(value);
		this.$proxy = new Proxy(
			this.$value,
			this,
		);
	}

	get(target, key) {
		if (key === SYMBOL_KEY_REACTIVE) {
			return this;
		}

		// if (
		// 	this.$tracked_methods
		// 	&& hasOwnProperty(this.$tracked_methods, key)
		// ) {
		// 	const fn = this.$tracked_methods[key];
		// 	return (...args) => {
		// 		this.$registerChange(
		// 			...fn(...args),
		// 		);

		// 		return Reflect.apply(
		// 			target[key],
		// 			target,
		// 			args,
		// 		);
		// 	};
		// }

		return Reflect.get(
			target,
			key,
		);
	}

	$registerChange(key, value = SYMBOL_NO_VALUE) {
		// if that key was changed before in this tick
		if (this.#changes.has(key)) {
			// and the new value is the same as the very previous one
			if (this.#changes.get(key) === value) {
				// delete that change
				this.#changes.delete(key);
			}
		}
		// if value changed for a first time in this tick
		else {
			const changes_count_before = this.#changes.size;

			this.#changes.set(
				key,
				this.$hasValue(key) ? this.$getValue(key) : SYMBOL_NO_VALUE,
			);

			if (changes_count_before === 0) {
				this.#scheduleNotification();
			}
		}
	}

	#scheduleNotification() {
		nextTick(() => {
			if (this.#changes.size > 0) {
				console.log('>>> [UPDATE]', this.$proxy, this.#changes);

				for (const [ key, value_old ] of this.#changes) {
					if (isReactive(value_old)) {
						value_old[SYMBOL_KEY_REACTIVE]._remove(this);
					}

					if (this.$hasValue(key)) {
						this.$getValue(key)[SYMBOL_KEY_REACTIVE]._add(this);
					}
				}

				this.#changes.clear();
			}
		});
	}
}
