
import { ref, readonly } from 'vue';

import { isPlainObject } from '../../utils.js';
import { comment, fragment } from '../element.js';

function getKVIterator(value) {
	if (isPlainObject(value)) {
		return Object.entries(value);
	}

	if (
		Array.isArray(value)
		|| value instanceof Map
		|| value instanceof Set
	) {
		return value.entries();
	}

	if (typeof value === 'number') {
		const array = [];
		for (let index = 0; index < value; index++) {
			array.push([
				index,
				index,
			]);
		}

		return array;
	}

	throw new TypeError('Cannot iterate over value');
}

export function reactiveFor(watcher, getter_key, getter) {
	const element_placeholder = comment();
	const copperState = element_placeholder._copper;

	let first_element_active = element_placeholder;
	const elements_active = new Map();

	const has_cache_key_getter = typeof getter_key === 'function';

	setTimeout(() => {
		copperState.watch(
			watcher,
			(value) => {
				const cache_keys_active = new Set(
					elements_active.keys(),
				);

				if (first_element_active !== element_placeholder) {
					first_element_active.parentNode.insertBefore(
						element_placeholder,
						first_element_active,
					);
				}

				const element_fragment = fragment();

				for (const [ inner_key, inner_value ] of getKVIterator(value)) {
					const cache_key = has_cache_key_getter ? getter_key(inner_value, inner_key) : Symbol('');
					cache_keys_active.delete(cache_key);

					let ref_key;
					let ref_value;
					let elements;
					if (elements_active.has(cache_key)) {
						({
							ref_key,
							ref_value,
							elements,
						} = elements_active.get(cache_key));

						ref_key.value = inner_key;
						ref_value.value = inner_value;
					}
					else {
						ref_key = ref(inner_key);
						ref_value = ref(inner_value);

						elements = getter(
							readonly(ref_value),
							readonly(ref_key),
						);
					}

					if (elements.length === 0) {
						continue;
					}

					element_fragment.append(
						...elements,
					);

					elements_active.set(
						cache_key,
						{
							ref_key,
							ref_value,
							elements,
						},
					);
				}

				for (const cache_key of cache_keys_active) {
					const { elements } = elements_active.get(cache_key);

					for (const element of elements) {
						element.remove();
						element._copper?.destroy();
					}

					elements_active.delete(cache_key);
				}

				if (element_fragment.childNodes.length === 0) {
					first_element_active = element_placeholder;
				}
				else {
					first_element_active = element_fragment.firstChild;

					element_placeholder.replaceWith(
						element_fragment,
					);
				}
			},
			{
				deep: true,
				immediate: true,
			},
		);
	});

	copperState.addWatcher(() => {
		for (const { elements } of elements_active.values()) {
			for (const element of elements) {
				element.remove();
				element._copper?.destroy();
			}
		}

		elements_active.clear();
	});

	return element_placeholder;
}
