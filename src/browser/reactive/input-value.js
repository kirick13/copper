
import { watch } from 'vue';

import { extractValue } from '../utils.js';

export function reactiveInputValue(element, watcher) {
	element._copper.watchers.add(
		watch(
			watcher,
			(value) => {
				element.value = extractValue(value);
			},
			{
				deep: true,
				immediate: true,
			},
		),
	);

	{
		const args = [
			'input',
			() => {
				watcher().value = element.value;
			},
		];

		element.addEventListener(...args);
		element._copper.watchers.add(
			() => {
				element.removeEventListener(...args);
			},
		);
	}
}
