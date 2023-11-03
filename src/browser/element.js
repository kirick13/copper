
function attachCopper(element) {
	Object.defineProperty(
		element,
		'_copper',
		{
			value: {
				watchers: new Set(),
			},
			writable: false,
			configurable: false,
		},
	);
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function el(tag) {
	const element = document.createElement(tag);
	attachCopper(element);

	return element;
}

export function text(text) {
	const text_node = document.createTextNode(text);
	attachCopper(text_node);

	return text_node;
}
