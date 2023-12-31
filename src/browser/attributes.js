
import { unref }              from 'vue';
import { BOOLEAN_ATTRIBUTES } from '../data/boolean-attributes.js';
import { isPlainObject } 	  from '../utils.js';

function convertClasses(value) {
	const classes = new Set();

	if (typeof value === 'string') {
		for (const class_name of value.split(' ')) {
			classes.add(class_name);
		}
	}
	else if (isPlainObject(value)) {
		for (const [ key, is_active ] of Object.entries(value)) {
			if (is_active) {
				classes.add(key);
			}
		}
	}
	else if (Array.isArray(value)) {
		for (const item of value) {
			classes.add(item);
		}
	}

	return classes;
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
	else if (key === 'class') {
		const class_names_before = convertClasses(value_old);

		for (const class_name of convertClasses(value)) {
			element.classList.add(class_name);
			class_names_before.delete(class_name);
		}

		for (const class_name of class_names_before) {
			element.classList.remove(class_name);
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
					attr(
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
