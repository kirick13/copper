
import { unref }       from 'vue';
import { CopperState } from './copper-state.js';

function attachCopper(element) {
	element._copper ??= new CopperState(element);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function el(tag) {
	const element = document.createElement(tag);
	attachCopper(element);

	return element;
}

export function text(arg0) {
	const is_getter = typeof arg0 === 'function';

	const element = document.createTextNode(
		is_getter
			? ''
			: (arg0 ?? ' '),
	);
	attachCopper(element);

	if (is_getter) {
		element._copper.watch(
			arg0,
			(value) => {
				element.textContent = String(
					unref(value),
				);
			},
			{
				deep: true,
				immediate: true,
			},
		);
	}

	return element;
}

export function fragment() {
	return document.createDocumentFragment();
}

export function comment(text = '') {
	const element = document.createComment(text);
	attachCopper(element);

	return element;
}
