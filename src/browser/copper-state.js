
import { watch } from 'vue';

export class CopperState {
	element;
	#watchers = [];

	constructor(element) {
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
