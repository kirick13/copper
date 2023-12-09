
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
		const validator = copperState.propsValidators?.[key];
		const is_validator_function = typeof validator === 'function';

		copperState.watch(
			watcher,
			(value) => {
				if (is_validator_function && validator(value) !== true) {
					console.error(`Invalid value for property ${key} on component`, element);
				}
				else {
					prop.value = value;
				}
			},
			{
				immediate: true,
			},
		);

		copperState.props[key] = readonly(prop);
	}

	return element;
}
