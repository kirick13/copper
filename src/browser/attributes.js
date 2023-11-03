
import { watch } from 'vue';

import { BOOLEAN_ATTRIBUTES } from '../data/boolean-attributes.js';
import { extractValue }       from './utils.js';

// eslint-disable-next-line unicorn/prevent-abbreviations
export function attr(element, key, value) {
	if (BOOLEAN_ATTRIBUTES.has(key)) {
		if (value === false || value === null || value === undefined) {
			element.removeAttribute(key);
		}
		else {
			element.setAttribute(key, '');
		}
	}
	else if (value === null || value === undefined) {
		element.removeAttribute(key);
	}
	else {
		element.setAttribute(key, value);
	}
}
// eslint-disable-next-line unicorn/prevent-abbreviations
export function reactiveAttr(element, key, watcher) {
	element._copper.watchers.add(
		watch(
			watcher,
			(value) => {
				attr(element, key, extractValue(value));
			},
			{
				deep: true,
				immediate: true,
			},
		),
	);
}
