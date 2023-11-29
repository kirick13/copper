
import * as t from '@babel/types';

export function getAstCreateElement(tag_name, namespace) {
	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable(namespace ?? 'el'),
		),
		[
			t.stringLiteral(tag_name),
		],
	);
}
