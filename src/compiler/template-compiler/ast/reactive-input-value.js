
import * as t                   from '@babel/types';
import { parseRawJsExpression } from '../../utils.js';

export function getAstReactiveInputValue(ast_target, [ expression ]) {
	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('reactiveInputValue'),
		),
		[
			ast_target,
			t.arrowFunctionExpression(
				[],
				parseRawJsExpression(expression),
			),
			t.arrowFunctionExpression(
				[
					t.identifier('value'),
				],
				t.assignmentExpression(
					'=',
					parseRawJsExpression(expression),
					t.identifier('value'),
				),
			),
		],
	);
}
