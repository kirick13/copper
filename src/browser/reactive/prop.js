
import {
	ref,
	readonly } from 'vue';

export function reactiveProp(element, ...args) {
	const copperState = element._copper;

	for (
		let index = 0;
		index < args.length;
		index += 2
	) {
		const key = args[index];
		const watcher = args[index + 1];

		const prop = ref();

		copperState.watch(
			watcher,
			(value) => {
				console.log(copperState.propsValidators);
				prop.value = value;
			},
			{
				immediate: true,
			},
		);

		copperState.props[key] = readonly(prop);
	}

	return element;
}
