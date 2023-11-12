
import * as t from '@babel/types';

export function getAstCreateElement(tag_name) {
	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('el'),
		),
		[
			t.stringLiteral(tag_name),
		],
	);
}
