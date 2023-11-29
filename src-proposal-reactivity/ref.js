
import { nextTick } from './utils/next-tick.js';

import { CopperBase }    from './base.js';
import {
	SYMBOL_KEY_REACTIVE,
	isReactive }         from './is-reactive.js';

const SYMBOL_NO_VALUE = Symbol('NO_VALUE');

class CopperRef extends CopperBase {
	#value;
	#value_old = SYMBOL_NO_VALUE;

	#is_notification_scheduled = false;

	/**
	 * @param {*} value - value to be wrapped as reference
	 */
	constructor(value) {
		super();

		// FIXME: this.#value = reactive(value);
		this.#value = value;
	}

	/**
	 * @returns {CopperRef} - this
	 */
	get [SYMBOL_KEY_REACTIVE]() {
		return this;
	}

	/**
	 * @returns {*} - value
	 */
	get value() {
		return this.#value;
	}

	/**
	 * @param {*} value - value to be set
	 */
	set value(value) {
		if (value !== this.#value) {
			if (this.#is_notification_scheduled === false) {
				this.#value_old = this.#value;
				this.#scheduleNotification();
			}

			// FIXME: this.#value = reactive(value);
			this.#value = value;
		}
	}

	#scheduleNotification() {
		this.#is_notification_scheduled = true;

		nextTick(() => {
			if (this.#value !== this.#value_old) {
				// if old value was reactive, remove this instance from its nofitication targets
				if (isReactive(this.#value_old)) {
					this.#value_old[SYMBOL_KEY_REACTIVE]._remove(this);
				}

				// if new value is reactive, add this instance to its nofitication targets
				if (isReactive(this.#value)) {
					this.#value[SYMBOL_KEY_REACTIVE]._add(this);
				}

				this._notifyUpdated(
					this.#value,
					this.#value_old,
				);
			}

			this.#value_old = SYMBOL_NO_VALUE;

			this.#is_notification_scheduled = false;
		});
	}
}

export function ref(value) {
	return new CopperRef(value);
}
