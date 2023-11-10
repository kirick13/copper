
import * as astring                  from 'astring';
import { TemplateCompiler }          from '../compiler/template-compiler.js';
import { getAstProgram }             from './ast/program.js';
import { getAstClass }               from './flow/ast/class.js';
import { getAstDefineCustomElement } from './flow/ast/define-custom-element.js';
import { getAstsImports }            from './flow/ast/imports.js';
import { getAstStateProperties }     from './flow/ast/state-properties.js';
import { getAstStyle }               from './flow/ast/style.js';
import flowConstructor               from './flow/methods/constructor.js';
import flowProcessScript             from './flow/methods/process-script.js';
import flowSaveImport                from './flow/methods/save-import.js';
import flowUseImports                from './flow/methods/use-imports.js';

function componentNameToClassName(component_name) {
	if (component_name.startsWith('cu-')) {
		component_name = component_name.slice(3);
	}

	return component_name.replaceAll(
		/(?:^|-)([a-z])/g,
		(_, letter) => letter.toUpperCase(),
	);
}

export class CompilerFlow {
	element = {
		node: null,
		tag_name: '',
	};

	imports = new Map();
	state_variables = new Set();
	script_ast;
	style;

	ast_pseudo_imports = [];
	result_ast_body = [];

	constructor(component_source_code) {
		flowConstructor.call(
			this,
			component_source_code,
		);

		this._processScript();
	}

	_processScript() {
		if (this.script_ast) {
			flowProcessScript.call(this);
		}

		// add "imports" back
		this._useImports();
	}

	_saveImport(source_name, specifiers) {
		flowSaveImport.call(
			this,
			source_name,
			specifiers,
		);
	}

	_useImports() {
		flowUseImports.call(this);

		this.#prepareResult();
	}

	#prepareResult() {
		const { node, tag_name } = this.element;
		const class_name = `Copper${componentNameToClassName(tag_name)}Element`;

		this.result_ast_body.push(
			...getAstsImports(),
			getAstStyle(
				this.style,
			),
			getAstClass(
				class_name,
				getAstStateProperties(
					this.state_variables,
				),
				[
					...this.ast_pseudo_imports,
					...(this.script_ast?.body ?? []),
				],
				[
					...this.ast_pseudo_imports,
					...(new TemplateCompiler(node)).ast,
				],
			),
			getAstDefineCustomElement(
				tag_name,
				class_name,
			),
		);

		this.result = astring.generate(
			getAstProgram(
				this.result_ast_body,
			),
			{
				ecmaVersion: '2023',
			},
		);
	}
}
