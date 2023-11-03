
export class CopperBase {
	/**
	 * @private
	 * @type {Set<Function>}
	 */
	#targets = new Set();
	/**
	 * @type {Set<Function>}
	 */
	#targets_deep = new Set();

	/**
	 * @protected
	 * Adds a CopperBase instance to receive updates from this instance
	 * This instance may be included to another ref or reactive and parent structure wants to know if there was an update to trigger deep watchers
	 * @param {CopperBase} target - CopperBase instance to receive deep updates
	 */
	_add(target) {
		this.#targets_deep.add(target);
	}

	/**
	 * @protected
	 * Removes a CopperBase instance from receiving updates from this instance
	 * @param {CopperBase} target - CopperBase instance
	 */
	_remove(target) {
		this.#targets_deep.delete(target);
	}

	// /**
	//  * Subscribes for updates happened directly on this instance
	//  * @param {Function} callback - callback
	//  * @returns {Function} - unsubscribe function
	//  */
	watch(stack, callback) {
		this.#targets.add(callback);

		return () => {
			this.#targets.delete(callback);
		};
	}

	/**
	 * @protected
	 * Notifies all subscribers about an update happened on this instance or any of its children
	 */
	_notifyUpdated(value, value_old) {
		console.log('notification on', this, value, value_old);

		for (const target of this.#targets) {
			target(
				value,
				value_old,
			);
		}

		for (const target of this.#targets_deep) {
			if (target instanceof CopperBase) {
				target._notifyUpdated();
			}
			else if (typeof target === 'function') {
				target(
					value,
					value_old,
				);
			}
		}
	}
}
