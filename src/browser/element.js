
import { CopperState } from './copper-state.js';

function attachCopper(element) {
	element._copper = new CopperState(element);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function el(tag) {
	const element = document.createElement(tag);
	attachCopper(element);

	return element;
}

export function text(text = '') {
	const text_node = document.createTextNode(text);
	attachCopper(text_node);

	return text_node;
}

export function fragment() {
	return document.createDocumentFragment();
}

export function comment(text = '') {
	const element = document.createComment(text);
	attachCopper(element);

	return element;
}
