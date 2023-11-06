
import { watch } from 'vue';

export class CopperState {
	element;
	watchers = new Set();

	constructor(element) {
		this.element = element;
	}

	watch(...args) {
		const unwatch = watch(...args);

		this.watchers.add(unwatch);

		return unwatch;
	}

	listen(...args) {
		this.element.addEventListener(...args);

		const removeListener = () => {
			this.element.removeEventListener(...args);
		};

		this.watchers.add(removeListener);

		return removeListener;
	}

	destroy() {
		// this.watchers_weak = new WeakSet();
		// this.watchers_weak.add(() => {});
		for (const watcher of this.watchers) {
			// this.watchers_weak.add(watcher);
			watcher();
		}

		this.watchers.clear();

		for (const child of this.element.childNodes) {
			child._copper?.destroy();
		}

		delete this.element._copper;
		this.element = null;
	}
}
