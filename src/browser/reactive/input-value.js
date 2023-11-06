
import { extractValue } from '../utils.js';

export function reactiveInputValue(element, watcher) {
	element._copper.watch(
		watcher,
		(value) => {
			element.value = extractValue(value);
		},
		{
			deep: true,
			immediate: true,
		},
	);

	element._copper.listen(
		'input',
		() => {
			watcher().value = element.value;
		},
	);
}
