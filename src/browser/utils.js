
import { isRef } from 'vue';

export function extractValue(source) {
	if (isRef(source)) {
		return source.value;
	}

	return source;
}
