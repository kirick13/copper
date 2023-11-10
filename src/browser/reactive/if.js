
import { comment, fragment }    from '../element.js';

// const weak_copper_states = window._copper_ifs = new WeakSet(); // TODO: remove
// const weak_elements = window._copper_ifs_elements = new WeakSet(); // TODO: remove

function getNewElements(getter, element_placeholder) {
	let element_to_insert = element_placeholder;
	let elements_new = [];

	if (typeof getter === 'function') {
		elements_new = getter();
	}

	if (elements_new.length === 0) {
		elements_new.push(element_placeholder);
	}
	else {
		element_to_insert = fragment();
		element_to_insert.append(
			...elements_new,
		);
	}

	return [
		element_to_insert,
		elements_new,
	];
}

export function reactiveIf(watcher, outcomes) {
	const element_placeholder = comment();
	const copperState = element_placeholder._copper;

	// weak_copper_states.add(copperState); // TODO: remove

	const elements_active = [ element_placeholder ];

	setTimeout(() => {
		copperState.watch(
			watcher,
			(outcome_index) => {
				const [
					element_to_insert,
					elements_new,
				] = getNewElements(
					outcomes[outcome_index],
					element_placeholder,
				);

				while (elements_active.length > 0) {
					const element_remove = elements_active.pop();

					// weak_elements.add(element_remove); // TODO: remove

					if (elements_active.length === 0) {
						element_remove.replaceWith(element_to_insert);
					}
					else {
						element_remove.remove();
					}

					if (element_remove !== element_placeholder) {
						element_remove._copper?.destroy();
					}
				}

				elements_active.push(
					...elements_new,
				);

				// TODO: remove
				// for (const element of elements_active) {
				// 	weak_elements.add(element);
				// }
			},
			{
				immediate: true,
			},
		);
	});

	copperState.addWatcher(() => {
		for (const element of elements_active) {
			element.remove();
			element._copper?.destroy();
		}

		elements_active.length = 0;
	});

	return element_placeholder;
}
