
import { getAstCreateElement }      from './template-compiler/ast/create-element.js';
import { getAstSetAttributes }      from './template-compiler/ast/attributes.js';
import {
	getAstPlainTextNode,
	getAstReactiveTextNode }        from './template-compiler/ast/text-node.js';
import {
	compileComponentAttribute,
	compileElementAttribute }       from './template-compiler/attribute.js';
import { templateCompilerFor }      from './template-compiler/for.js';
import { TemplateCompilerIf }       from './template-compiler/if.js';
import {
	parseAttribute,
	parseMustache }                 from './utils.js';
import { getAstListener }           from './template-compiler/ast/listener.js';
import { getAstAppend }             from './template-compiler/ast/append.js';
import { getAstReactiveInputValue } from './template-compiler/ast/reactive-input-value.js';
import { getAstReactiveProperty }   from './template-compiler/ast/reactive-property.js';

export class TemplateCompiler {
	flow;
	asts = [];

	constructor(flow, node, context) {
		this.flow = flow;

		this.asts.push(
			...this.#convertChilds(
				node,
				context,
			),
		);
	}

	#convertChilds(node, upper_context = {}) {
		const asts = [];

		const context = {
			namespace: upper_context.namespace ?? null,
			if: null,
			flushIf() {
				if (this.if) {
					asts.push(
						this.if.flush(),
					);

					this.if = null;
				}
			},
		};

		for (const element_child of node.childNodes) {
			asts.push(
				...this.#convertElement(
					element_child,
					context,
				),
			);
		}

		context.flushIf();

		return asts;
	}

	#convertElement(element, context) {
		const asts = [];

		// special element
		if (element.nodeName === 'cu') {
			const attributes = new Map();
			for (const { name, value } of element.attrs) {
				attributes.set(name, value);
			}

			if (attributes.has('if')) {
				context.flushIf();

				context.if = new TemplateCompilerIf(
					this.flow,
					attributes.get('if'),
					element,
					context,
				);
			}
			else if (attributes.has('else-if')) {
				context.if.addElseIf(
					attributes.get('else-if'),
					element,
				);
			}
			else if (attributes.has('else')) {
				context.if.addElse(
					element,
				);

				context.flushIf();
			}
			else if (attributes.has('for')) {
				asts.push(
					templateCompilerFor(
						this.flow,
						element,
						attributes,
						context,
					),
				);
			}
		}
		else if (element.nodeName.startsWith('#')) {
			switch (element.nodeName) {
				// TextNode
				case '#text':
					if (element.value.trim().length > 0) {
						context.flushIf();
					}

					for (const { text, expression } of parseMustache(element.value)) {
						if (text) {
							asts.push(
								getAstPlainTextNode.call(this, text),
							);
						}
						else if (expression) {
							asts.push(
								getAstReactiveTextNode.call(
									this,
									expression,
								),
							);
						}
						else {
							throw new Error('Invalid part of textNode.');
						}
					}
					break;
				default:
					return [];
			}
		}
		// Element
		else {
			context.flushIf();

			const tag_name = element.tagName.toLowerCase();
			const is_component = tag_name.includes('-');
			if (element.tagName === 'svg') {
				context.namespace ??= 'svg';
			}

			const calls = {
				attribute: [],
				attribute_reactive: [],
				property_reactive: [],
				listener: [],
				input_value_reactive: [],
			};

			for (const { name: attribute_name, value: attribute_value } of element.attrs) {
				const attribute_parsed = parseAttribute(attribute_name);

				const result = is_component
					? compileComponentAttribute(
						attribute_parsed,
						attribute_value,
					)
					: compileElementAttribute(
						attribute_parsed,
						attribute_value,
					);

				calls[result.target].push(...result.args);
			}

			let ast_element = getAstCreateElement.call(
				this,
				tag_name,
				context.namespace,
			);

			if (calls.attribute.length + calls.attribute_reactive.length > 0) {
				ast_element = getAstSetAttributes.call(
					this,
					ast_element,
					calls.attribute,
					calls.attribute_reactive,
				);
			}

			if (calls.property_reactive.length > 0) {
				ast_element = getAstReactiveProperty.call(
					this,
					ast_element,
					calls.property_reactive,
				);
			}

			if (calls.listener.length > 0) {
				ast_element = getAstListener.call(
					this,
					ast_element,
					calls.listener,
				);
			}

			if (calls.input_value_reactive.length > 0) {
				ast_element = getAstReactiveInputValue.call(
					this,
					ast_element,
					calls.input_value_reactive,
				);
			}

			// this.#convertChilds(element, variable);
			const asts_children = this.#convertChilds(element, context);
			if (asts_children.length > 0) {
				ast_element = getAstAppend.call(
					this,
					ast_element,
					asts_children,
				);
			}

			asts.push(
				ast_element,
			);
		}

		return asts;
	}
}
