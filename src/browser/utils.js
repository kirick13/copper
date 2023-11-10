
import { isRef } from 'vue';

export function unref(source) {
	if (isRef(source)) {
		return source.value;
	}

	return source;
}
