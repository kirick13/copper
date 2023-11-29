
import * as t                 from '@babel/types';
import { createVariableName } from '../../utils.js';

export function getAstStyle(flow, style) {
	if (typeof style === 'string' && style.length > 0) {
		const variable = createVariableName();
		return t.blockStatement([
			t.variableDeclaration(
				'const',
				[
					t.variableDeclarator(
						t.identifier(variable),
						t.callExpression(
							t.identifier(
								flow._getCopperImportVariable('el'),
							),
							[
								t.stringLiteral('style'),
							],
						),
					),
				],
			),
			t.expressionStatement(
				t.assignmentExpression(
					'=',
					t.memberExpression(
						t.identifier(variable),
						t.identifier('innerText'),
					),
					t.stringLiteral(style),
				),
			),
			t.expressionStatement(
				t.callExpression(
					t.memberExpression(
						t.memberExpression(
							t.identifier('document'),
							t.identifier('head'),
						),
						t.identifier('append'),
					),
					[
						t.identifier(variable),
					],
				),
			),
		]);
	}

	return t.noop();
}
