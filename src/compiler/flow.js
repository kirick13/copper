
import generateJs                    from '@babel/generator';
import * as t                        from '@babel/types';
import { TemplateCompiler }          from '../compiler/template-compiler.js';
import { getAstProgram }             from './ast/program.js';
import { getAstClass }               from './flow/ast/class.js';
import { getAstDefineCustomElement } from './flow/ast/define-custom-element.js';
import { getAstCopperImports }       from './flow/ast/copper-imports.js';
import { getAstStateProperties }     from './flow/ast/state-properties.js';
import { getAstStyle }               from './flow/ast/style.js';
import flowBuildImports			     from './flow/methods/build-imports.js';
import flowConstructor               from './flow/methods/constructor.js';
import flowProcessImport 		     from './flow/methods/process-import.js';
import flowProcessScript             from './flow/methods/process-script.js';
import { createVariableName } from './utils.js';
import { magicUnref } from './magic-unref.js';

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
		tag_name: null,
	};

	script = {
		source: null,
		ast_source: null,
		ast_result: [],
		imports: new Map(),
		variables: new Set(),
		refs: new Map(),
	};

	style = {
		source: null,
	};

	constructor(component_source_code) {
		flowConstructor.call(
			this,
			component_source_code,
		);

		this._processScript();
	}

	_processScript() {
		if (this.script.source) {
			flowProcessScript.call(this);
		}

		this.templateCompiler = new TemplateCompiler(
			this,
			this.element.node,
		);
	}

	_processImport(source_name, specifiers) {
		flowProcessImport.call(
			this,
			source_name,
			specifiers,
		);
	}

	_buildImports() {
		return flowBuildImports.call(this);
	}

	_copper_imports = new Map();
	_getCopperImportVariable(variable) {
		if (this._copper_imports.has(variable) === false) {
			const variable_shadow = `_${variable}${createVariableName()}`;

			this._copper_imports.set(
				variable,
				variable_shadow,
			);

			return variable_shadow;
		}

		return this._copper_imports.get(variable);
	}

	encode() {
		const { tag_name } = this.element;
		const class_name = `Copper${componentNameToClassName(tag_name)}Element`;

		const asts_imports = this._buildImports();

		const ast_style = getAstStyle(
			this,
			this.style.source,
		);

		const ast_class = getAstClass.call(
			this,
			class_name,
			// variables in the form of ObjectPattern
			getAstStateProperties(
				this.script.variables,
			),
			// init script
			this.script.ast_result,
			// template script
			magicUnref(
				t.expressionStatement(
					t.callExpression(
						t.memberExpression(
							t.super(),
							t.identifier('render'),
						),
						this.templateCompiler.asts,
					),
				),
				this.script.refs,
			).ast,
		);

		const ast = [
			// add Copper imports
			getAstCopperImports(
				this._copper_imports,
			),
			// add script imports
			...asts_imports,
			// add style
			ast_style,
			// main class
			ast_class,
			// define ustom element
			getAstDefineCustomElement(
				tag_name,
				class_name,
			),
		];

		return generateJs(
			getAstProgram(ast),
		).code;
	}
}
