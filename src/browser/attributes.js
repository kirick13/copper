
import { unref }              from 'vue';
import { BOOLEAN_ATTRIBUTES } from '../data/boolean-attributes.js';
import { isPlainObject } 	  from '../utils.js';

function convertStructure(value) {
	const result = new Map();

	if (isPlainObject(value)) {
		for (const [ entry_key, entry_value ] of Object.entries(value)) {
			if (entry_value) {
				result.set(
					entry_key,
					entry_value,
				);
			}
		}
	}
	else if (Array.isArray(value)) {
		for (const item of value) {
			result.set(
				item,
				item,
			);
		}
	}

	return result;
}

// eslint-disable-next-line unicorn/prevent-abbreviations
function setAttr(element, key, value, value_old) {
	if (BOOLEAN_ATTRIBUTES.has(key)) {
		if (value) {
			element.setAttribute(key, '');
		}
		else {
			element.removeAttribute(key);
		}
	}
	else if (typeof value === 'string') {
		element.setAttribute(key, value);
	}
	else if (key === 'class') {
		const class_names_before = convertStructure(value_old);

		for (const class_name of convertStructure(value).keys()) {
			element.classList.add(class_name);
			class_names_before.delete(class_name);
		}

		for (const class_name of class_names_before.keys()) {
			element.classList.remove(class_name);
		}
	}
	else if (key === 'style') {
		const styles_before = convertStructure(value_old);

		for (const [ property, property_value ] of convertStructure(value)) {
			element.style.setProperty(property, property_value);
			styles_before.delete(property);
		}

		for (const property of styles_before.keys()) {
			element.style.removeProperty(property);
		}
	}
	else if (
		value !== null
		&& value !== undefined
	) {
		element.setAttribute(key, value);
	}
	else {
		element.removeAttribute(key);
	}
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function attr(element, ...args) {
	for (
		let index = 0;
		index < args.length;
		index += 2
	) {
		const key = args[index];
		const arg0 = args[index + 1];

		if (typeof arg0 === 'function') {
			element._copper.watch(
				arg0,
				(value, value_old) => {
					setAttr(
						element,
						key,
						unref(value),
						unref(value_old),
					);
				},
				{
					deep: true,
					immediate: true,
				},
			);
		}
		else {
			setAttr(
				element,
				key,
				arg0,
			);
		}
	}

	return element;
}
