
import { getAstCreateElement }          from './ast/create-element.js';
import { getAstCreateTextNode }         from './ast/create-text-node.js';
import { getAstListener }               from './ast/listener.js';
import { getAstNodesAppend }            from './ast/node-append.js';
import { getAstReactiveAttribute }      from './ast/reactive-attribute.js';
import { getAstReactiveInputValue }     from './ast/reactive-input-value.js';
import { getAstReactiveTextNode }       from './ast/reactive-text-node.js';
import { getAstSetAttribute }           from './ast/set-attribute.js';
import { getAstVariableDeclaration }    from './ast/variable-declaration.js';
import { converterFor } from './converter/for.js';
import { ConverterIf } from './converter/if.js';
import {
	createVariableName,
	parseAttribute,
	parseMustache }                  from './utils.js';

export class Converter {
	ast = [];
	variables;
	options = {
		no_append_on_root: false,
	};

	constructor(element, options = {}) {
		this.options.no_append_on_root = options.no_append_on_root ?? false;

		this.variables = new Set(
			this.#convertChilds(element),
		);
	}

	#convertChilds(element, variable_parent_element = '$root') {
		const variables = [];

		const { ast } = this;

		const context = {
			variable_parent_element,
			if: null,
			flushIf() {
				if (this.if) {
					const {
						variable,
						ast: ast_if,
					} = this.if.flush();

					ast.push(ast_if);
					variables.push(variable);

					this.if = null;
				}
			},
		};

		for (const element_child of element.childNodes) {
			variables.push(
				...this.#convertElement(
					element_child,
					context,
				),
			);
		}

		context.flushIf();

		if (
			variables.length > 0
			&& (
				variable_parent_element !== '$root'
				|| this.options.no_append_on_root !== true
			)
		) {
			ast.push(
				getAstNodesAppend(
					context.variable_parent_element,
					variables,
				),
			);
		}

		return variables;
	}

	#convertElement(element, context) {
		const variables = [];

		// special element
		if (element.nodeName === 'cu') {
			const attributes = new Map();
			for (const { name, value } of element.attrs) {
				attributes.set(name, value);
			}

			if (attributes.has('if')) {
				context.flushIf();

				context.if = new ConverterIf(
					attributes.get('if'),
					element,
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
				const variable = createVariableName();
				variables.push(variable);

				const ast = converterFor(element, attributes);
				this.ast.push(
					getAstVariableDeclaration(
						variable,
						ast,
					),
				);
			}
		}
		else if (element.nodeName.startsWith('#')) {
			switch (element.nodeName) {
				// TextNode
				case '#text': {
					if (element.value.trim().length > 0) {
						context.flushIf();
					}

					const parts = parseMustache(element.value);

					for (const { text, expression } of parts) {
						const variable = createVariableName();
						variables.push(variable);

						if (text) {
							this.ast.push(
								getAstVariableDeclaration(
									variable,
									getAstCreateTextNode(text),
								),
							);
						}
						else if (expression) {
							this.ast.push(
								getAstVariableDeclaration(
									variable,
									getAstCreateTextNode(),
								),
								getAstReactiveTextNode(
									variable,
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
					return [];
			}
		}
		// Element
		else {
			context.flushIf();

			const variable = createVariableName();
			variables.push(variable);

			this.ast.push(
				getAstVariableDeclaration(
					variable,
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
						this.ast.push(
							getAstReactiveInputValue(
								variable,
								attribute_value,
							),
						);
					}
					else {
						this.ast.push(
							getAstReactiveAttribute(
								variable,
								attribute,
								// modifiers,
								attribute_value,
							),
						);
					}
				}
				else if (is_event) {
					this.ast.push(
						getAstListener(
							variable,
							attribute,
							attribute_value,
							modifiers,
						),
					);
				}
				else {
					this.ast.push(
						getAstSetAttribute(
							variable,
							attribute_name,
							attribute_value,
						),
					);
				}
			}

			this.#convertChilds(element, variable);
		}

		return variables;
	}
}
