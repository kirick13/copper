
import * as t                   from '@babel/types';
import { parseRawJsExpression } from '../../utils.js';

export function getAstReactiveProperty(ast_target, args) {
	const asts_arguments = [
		ast_target,
	];

	for (let index = 0; index < args.length; index += 2) {
		asts_arguments.push(
			t.stringLiteral(
				args[index],
			),
			t.arrowFunctionExpression(
				[],
				parseRawJsExpression(
					args[index + 1],
				),
			),
		);
	}

	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('reactiveProp'),
		),
		asts_arguments,
	);
}
