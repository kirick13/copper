
import * as t from '@babel/types';

export function getAstClass({
	class_name,
	css,
	ast_state_properties,
	asts_constructor,
	asts_script,
	ast_render,
}) {
	const ast_class_body = [];

	if (typeof css === 'string' && css.length > 0) {
		ast_class_body.push(
			t.classProperty(
				t.identifier('css'),
				t.stringLiteral(css),
				null,
				null,
				false,
				true,
			),
		);
	}

	if (asts_constructor !== null) {
		ast_class_body.push(
			t.classMethod(
				'constructor',
				t.identifier('constructor'),
				[],
				t.blockStatement([
					t.expressionStatement(
						t.callExpression(
							t.super(),
							[],
						),
					),
					...asts_constructor,
				]),
			),
		);
	}

	ast_class_body.push(
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
	);

	return t.exportDefaultDeclaration(
		t.classDeclaration(
			t.identifier(class_name),
			t.identifier(
				this._getCopperImportVariable('CopperElement'),
			),
			t.classBody(
				ast_class_body,
			),
		),
	);
}
