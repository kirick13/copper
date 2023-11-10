
import { unref } from '../utils.js';

export function reactiveTextNode(element, watcher) {
	element._copper.watch(
		watcher,
		(value) => {
			element.textContent = String(unref(value));
		},
		{
			deep: true,
			immediate: true,
		},
	);
}
