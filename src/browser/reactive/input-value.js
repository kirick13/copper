
export function reactiveInputValue(element, watcher, setter) {
	element._copper.watch(
		watcher,
		(value) => {
			element.value = value;
		},
		{
			deep: true,
			immediate: true,
		},
	);

	element._copper.listen(
		'input',
		() => {
			setter(element.value);
		},
	);

	return element;
}
