
export function listen(element, ...args) {
	for (
		let index = 0;
		index < args.length;
		index += 3
	) {
		const event_name = args[index];
		const callback = args[index + 1];
		const modifiers = new Set(
			args[index + 2],
		);

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

		const listen_args = [
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

				callback(
					modifiers.has('.component')
						? event.detail
						: event,
				);
			},
		];
		if (Object.keys(options).length > 0) {
			listen_args.push(options);
		}

		element._copper.listen(
			...listen_args,
		);
	}

	return element;
}
