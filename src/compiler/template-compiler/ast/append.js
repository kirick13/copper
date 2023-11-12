
import * as t from '@babel/types';

export function getAstAppend(ast_target, asts_sources) {
	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('append'),
		),
		[
			ast_target,
			...asts_sources,
		],
	);
}
