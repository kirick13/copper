
export function listen(element, event_name, callback, modifiers) {
	modifiers = new Set(modifiers);

	const options = {};
	if (modifiers.has('once')) {
		options.once = true;
	}
	if (modifiers.has('passive')) {
		options.passive = true;
	}
	if (modifiers.has('capture')) {
		options.capture = true;
	}

	const args = [
		event_name,
		(event) => {
			if (modifiers.has('shift') && !event.shiftKey) {
				return;
			}
			if (modifiers.has('alt') && !event.altKey) {
				return;
			}
			if (modifiers.has('ctrl') && !event.ctrlKey) {
				return;
			}
			if (modifiers.has('meta') && !event.metaKey) {
				return;
			}

			if (modifiers.has('prevent')) {
				event.preventDefault();
			}
			if (modifiers.has('stop')) {
				event.stopPropagation();
			}

			callback(event);
		},
	];
	if (Object.keys(options).length > 0) {
		args.push(options);
	}

	element._copper.listen(...args);
}
