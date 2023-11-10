
import { watch } from 'vue';

// const weak_copper_elements = window._copper_elements = new WeakSet(); // TODO: remove
// const weak_copper_states = window._copper_states = new WeakSet(); // TODO: remove

export class CopperState {
	element;
	props = {};
	#watchers = [];

	constructor(element) {
		// weak_copper_elements.add(element); // TODO: remove
		// weak_copper_states.add(this); // TODO: remove

		this.element = element;
	}

	watch(...args) {
		const unwatch = watch(...args);

		this.#watchers.push(unwatch);

		return unwatch;
	}

	listen(...args) {
		this.element.addEventListener(...args);

		const removeListener = () => {
			this.element.removeEventListener(...args);
		};

		this.#watchers.push(removeListener);

		return removeListener;
	}

	addWatcher(watcher) {
		this.#watchers.push(watcher);
	}

	destroy() {
		while (this.#watchers.length > 0) {
			this.#watchers.pop()();
		}

		for (const child of this.element.childNodes) {
			child._copper?.destroy();
		}

		delete this.element._copper;
		this.element = null;
	}
}
