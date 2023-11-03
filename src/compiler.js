
import { generate } from 'astring';
import { inspect }  from 'node:util';
import { parse }    from 'parse5';

import { getAstCreateElement }       from './compiler/ast/create-element.js';
import { getAstCreateTextNode }      from './compiler/ast/create-text-node.js';
import { getAstListener }            from './compiler/ast/listener.js';
import { getAstNodeAppend }          from './compiler/ast/node-append.js';
import { getAstProgram }             from './compiler/ast/program.js';
import { getAstReactiveAttribute }   from './compiler/ast/reactive-attribute.js';
import { getAstReactiveInputValue }  from './compiler/ast/reactive-input-value.js';
import { getAstReactiveTextNode }    from './compiler/ast/reactive-text-node.js';
import { getAstSetAttribute }        from './compiler/ast/set-attribute.js';
import { getAstVariableDeclaration } from './compiler/ast/variable-declaration.js';

function createVariableName() {
	return `_${Math.random().toString(36).slice(2, 11)}`;
}

function parseAttribute(attribute_raw) {
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

function parseMustache(value) {
	let offset = 0;
	const parts = [];

	while (offset < value.length) {
		const index_start = value.indexOf('{{', offset);
		if (index_start === -1) {
			break;
		}

		parts.push({
			text: value.slice(offset, index_start),
		});

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

	{
		const text = value.slice(offset);
		if (text.length > 0) {
			parts.push({ text });
		}
	}

	// console.log(parts);

	return parts;
}

function convertElement(element, target, parent_element_variable = '$root') {
	const elements_variables = [];

	if (element.nodeName.startsWith('#')) {
		switch (element.nodeName) {
			// TextNode
			case '#text': {
				const parts = parseMustache(element.value);
				console.log('parts', parts);

				for (const { text, expression } of parts) {
					const element_variable = createVariableName();
					elements_variables.push(element_variable);
					console.log('element_variable', element_variable);

					if (text) {
						target.push(
							getAstVariableDeclaration(
								element_variable,
								getAstCreateTextNode(text),
							),
						);
					}
					else if (expression) {
						target.push(
							getAstVariableDeclaration(
								element_variable,
								getAstCreateTextNode(),
							),
							getAstReactiveTextNode(
								element_variable,
								expression,
							),
						);
					}
					else {
						throw new Error('Invalid part of textNode.');
					}
				}
			} break;
			default:
				return;
		}
	}
	// special element
	else if (element.nodeName === 'cu') {
		const attributes = new Map();
		for (const { name, value } of element.attrs) {
			attributes.set(name, value);
		}
	}
	// Element
	else {
		const element_variable = createVariableName();
		elements_variables.push(element_variable);

		target.push(
			getAstVariableDeclaration(
				element_variable,
				getAstCreateElement(element.tagName),
			),
		);

		for (const { name: attribute_name, value: attribute_value } of element.attrs) {
			const {
				is_bind,
				is_event,
				attribute,
				modifiers,
			} = parseAttribute(attribute_name);

			if (is_bind) {
				if (modifiers.includes('sync')) {
					target.push(
						getAstReactiveInputValue(
							element_variable,
							attribute_value,
						),
					);
				}
				else {
					target.push(
						getAstReactiveAttribute(
							element_variable,
							attribute,
							// modifiers,
							attribute_value,
						),
					);
				}
			}
			else if (is_event) {
				target.push(
					getAstListener(
						element_variable,
						attribute,
						attribute_value,
						modifiers,
					),
				);
			}
			else {
				target.push(
					getAstSetAttribute(
						element_variable,
						attribute_name,
						attribute_value,
					),
				);
			}
		}

		for (const element_child of element.childNodes) {
			convertElement(
				element_child,
				target,
				element_variable,
			);
		}
	}

	for (const element_variable of elements_variables) {
		target.push(
			getAstNodeAppend(
				element_variable,
				parent_element_variable,
			),
		);
	}
}

export function parseTemplate(html) {
	const program = getAstProgram();

	const document = parse(html);
	const element_html = document.childNodes[0];
	const element_body = element_html.childNodes[1];

	// console.log(
	// 	inspect(
	// 		element_body,
	// 		{
	// 			depth: null,
	// 			colors: true,
	// 		},
	// 	),
	// );

	for (const element_child of element_body.childNodes) {
		convertElement(
			element_child,
			program.body,
		);
	}

	console.log(
		inspect(
			program,
			{
				depth: null,
				colors: true,
			},
		),
	);

	return generate(program);
}
