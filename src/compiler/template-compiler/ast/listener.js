
import * as t                   from '@babel/types';
import { parseRawJsExpression } from '../../utils.js';

export function getAstListener(ast_target, args) {
	const asts_arguments = [
		ast_target,
	];

	for (let index = 0; index < args.length; index += 3) {
		const event_name = args[index];
		const expression = args[index + 1];
		const modifiers = args[index + 2];

		const asts_modifiers = [];
		for (const modifier of modifiers) {
			asts_modifiers.push(
				t.stringLiteral(modifier),
			);
		}

		asts_arguments.push(
			t.stringLiteral(event_name),
			t.arrowFunctionExpression(
				[
					t.identifier('$event'),
				],
				parseRawJsExpression(expression),
			),
			t.arrayExpression(
				asts_modifiers,
			),
		);
	}

	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('listen'),
		),
		asts_arguments,
	);
}
