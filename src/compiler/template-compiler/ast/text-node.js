
import * as t from '@babel/types';
import { parseRawJsExpression } from '../../utils.js';

const REGEXP_MULTISPACE = /\s+/g;

export function getAstPlainTextNode(text) {
	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('text'),
		),
		text.trim().length === 0
			? []
			: [
				t.stringLiteral(
					text.replaceAll(
						REGEXP_MULTISPACE,
						' ',
					),
				),
			],
	);
}

export function getAstReactiveTextNode(attribute_expression) {
	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('text'),
		),
		[
			t.arrowFunctionExpression(
				[],
				parseRawJsExpression(attribute_expression),
			),
		],
	);
}
