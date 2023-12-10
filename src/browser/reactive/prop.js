
export function reactiveProp(element, ...args) {
	for (
		let index = 0;
		index < args.length;
		index += 2
	) {
		const prop_name = args[index];
		const watcher = args[index + 1];

		element.bindProp(
			prop_name,
			watcher,
		);
	}

	return element;
}
