
import * as t                   from '@babel/types';
import { parseRawJsExpression } from '../../utils.js';

function getAstsPlainAttributes(args) {
	const asts_arguments = [];

	for (let index = 0; index < args.length; index += 2) {
		asts_arguments.push(
			t.stringLiteral(
				args[index],
			),
			t.stringLiteral(
				args[index + 1],
			),
		);
	}

	return asts_arguments;
}

function getAstsReactiveAttributes(args) {
	const asts_arguments = [];

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

	return asts_arguments;
}

export function getAstSetAttributes(ast_target, args_plain, args_reactive) {
	const asts_arguments = [
		ast_target,
	];

	if (args_plain.length > 0) {
		asts_arguments.push(
			...getAstsPlainAttributes(args_plain),
		);
	}
	if (args_reactive.length > 0) {
		asts_arguments.push(
			...getAstsReactiveAttributes(args_reactive),
		);
	}

	return t.callExpression(
		t.identifier(
			this.flow._getCopperImportVariable('attr'),
		),
		asts_arguments,
	);
}
