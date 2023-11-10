
import {
	ref,
	readonly } from 'vue';

export function reactiveProp(element, key, watcher) {
	const copperState = element._copper;

	const prop = ref();

	copperState.watch(
		watcher,
		(value) => {
			prop.value = value;
		},
		{
			immediate: true,
		},
	);

	copperState.props[key] = readonly(prop);
}
