
import { extractValue } from '../utils.js';

export function reactiveTextNode(element, watcher) {
	element._copper.watch(
		watcher,
		(value) => {
			element.textContent = String(extractValue(value));
		},
		{
			deep: true,
			immediate: true,
		},
	);
}
