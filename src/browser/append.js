
export function append(element_target, ...elements_to_append) {
	element_target.append(
		...elements_to_append,
	);

	return element_target;
}
