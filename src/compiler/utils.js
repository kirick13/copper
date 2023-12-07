
import { parse as parseJs } from '@babel/parser';

export function createVariableName() {
	return `_${Math.random().toString(36).slice(2, 11)}`;
}

export function replaceObjectContents(target, source) {
	for (const key of Object.keys(target)) {
		delete target[key];
	}

	for (const [ key, value ] of Object.entries(source)) {
		target[key] = value;
	}
}

export function parseAttribute(attribute_raw) {
	const is_bind = attribute_raw.startsWith(':');
	const is_event = attribute_raw.startsWith('@');

	if (is_bind || is_event) {
		const [ attribute, ...modifiers ] = attribute_raw.slice(1).split('.');
		return {
			is_bind,
			is_event,
			attribute,
			modifiers,
		};
	}

	return {
		is_bind,
		is_event,
		attribute: attribute_raw,
	};
}

function addTextPart(parts, text) {
	if (text.length > 0) {
		parts.push({ text });
	}
}

export function parseMustache(value) {
	let offset = 0;
	const parts = [];

	while (offset < value.length) {
		const index_start = value.indexOf('{{', offset);
		if (index_start === -1) {
			break;
		}

		addTextPart(
			parts,
			value.slice(
				offset,
				index_start,
			),
		);

		const index_end = value.indexOf('}}', index_start);
		if (index_end === -1) {
			throw new Error('Invalid mustache syntax found.');
		}

		const expression = value.slice(index_start + 2, index_end).trim();
		if (expression.length === 0) {
			throw new Error('Invalid mustache syntax found.');
		}

		parts.push({ expression });

		offset = index_end + 2;
	}

	addTextPart(
		parts,
		value.slice(offset),
	);

	// console.log(parts);

	return parts;
}

export function parseRawJsExpression(rawjs_code) {
	try {
		return parseJs(
			'_=' + rawjs_code,
			{
				ecmaVersion: 'latest',
			},
		).program.body[0].expression.right;
	}
	catch {
		throw new Error(`Invalid expression: "${rawjs_code}".`);
	}
}
