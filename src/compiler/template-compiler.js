
import { getAstCreateElement }       from './template-compiler/ast/create-element.js';
import { getAstCreateTextNode }      from './template-compiler/ast/create-text-node.js';
import { getAstNodesAppend }         from './template-compiler/ast/node-append.js';
import { getAstReactiveTextNode }    from './template-compiler/ast/reactive-text-node.js';
import { getAstVariableDeclaration } from './template-compiler/ast/variable-declaration.js';
import {
	compileComponentAttribute,
	compileElementAttribute }        from './template-compiler/attribute.js';
import { templateCompilerFor }       from './template-compiler/for.js';
import { TemplateCompilerIf }        from './template-compiler/if.js';
import {
	createVariableName,
	parseAttribute,
	parseMustache }                  from './utils.js';

export class TemplateCompiler {
	ast = [];
	variables;
	options = {
		no_append_on_root: false,
	};

	constructor(node, options = {}) {
		this.options.no_append_on_root = options.no_append_on_root ?? false;

		this.variables = new Set(
			this.#convertChilds(node),
		);
	}

	#convertChilds(node, variable_parent_element = '$root') {
		const variables = [];

		const {
			ast,
			options,
		} = this;

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

		for (const element_child of node.childNodes) {
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
				|| options.no_append_on_root !== true
			)
		) {
			ast.push(
				getAstNodesAppend(
					variable_parent_element,
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

				context.if = new TemplateCompilerIf(
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

				const ast = templateCompilerFor(element, attributes);
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

			const is_component = element.tagName.includes('-');

			for (const { name: attribute_name, value: attribute_value } of element.attrs) {
				this.ast.push(
					is_component
						? compileComponentAttribute(
							variable,
							parseAttribute(attribute_name),
							attribute_value,
						)
						: compileElementAttribute(
							variable,
							parseAttribute(attribute_name),
							attribute_value,
						),
				);
			}

			this.#convertChilds(element, variable);
		}

		return variables;
	}
}
