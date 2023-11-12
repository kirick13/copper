
import * as t from '@babel/types';

export function getAstClass(
	class_name,
	ast_state_properties,
	asts_script,
	ast_render,
) {
	return t.exportDefaultDeclaration(
		t.classDeclaration(
			t.identifier(class_name),
			t.identifier(
				this._getCopperImportVariable('CopperElement'),
			),
			t.classBody([
				t.classMethod(
					'method',
					t.identifier('init'),
					[],
					t.blockStatement([
						...asts_script,
						t.expressionStatement(
							t.callExpression(
								t.memberExpression(
									t.super(),
									t.identifier('init'),
								),
								[
									t.objectExpression(ast_state_properties),
								],
							),
						),
					]),
				),
				t.classMethod(
					'method',
					t.identifier('render'),
					[
						t.objectPattern(ast_state_properties),
					],
					t.blockStatement([
						ast_render,
					]),
				),
			]),
		),
	);
}
