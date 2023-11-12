
import * as babelTypes from '@babel/types';
import {
	REF,
	magicUnref }       from '../../magic-unref.js';

export default function () {
	// check for hoisting
	for (const node of this.script.ast_source) {
		switch (node.type) {
			case 'VariableDeclaration':
				// do nothing
				break;
			case 'ImportDeclaration':
				if (node.source.type !== 'StringLiteral') {
					throw new Error('Unexpected node type for source of import, expected StringLiteral.');
				}

				this._processImport(
					node.source.value,
					node.specifiers,
				);
				break;
			case 'FunctionDeclaration':
				this.script.variables.add(node.id.name);
				break;
			default:
				throw new Error(`Unexpected "${node.type}" found at the top level of script.`);
		}
	}

	// do actual job
	for (const node of this.script.ast_source) {
		switch (node.type) {
			case 'VariableDeclaration':
				if (node.kind === 'var') {
					throw new Error('Variable declarations with "var" are not supported.');
				}

				for (const declarator of node.declarations) {
					processVariableDeclarator(
						this,
						node.kind,
						declarator,
					);
				}
				break;
			case 'FunctionDeclaration':
				magicUnref(
					node,
					this.script.refs,
				);

				this.script.ast_result.push(
					babelTypes.variableDeclaration(
						'const',
						[
							babelTypes.variableDeclarator(
								babelTypes.identifier(node.id.name),
								babelTypes.callExpression(
									babelTypes.memberExpression(
										babelTypes.functionExpression(
											node.id,
											node.params,
											node.body,
											node.generator,
											node.async,
										),
										babelTypes.identifier('bind'),
									),
									[
										babelTypes.thisExpression(),
									],
								),
							),
						],
					),
				);
				break;
			// no default
		}
	}
}

const UNSUPPORTED_DECLARATOR_ID_TYPES = new Set([
	'ObjectPattern',
	'ArrayPattern',
]);
const FUNCTION_EXPRESSION_TYPES = new Set([
	'ArrowFunctionExpression',
	'FunctionExpression',
]);
function processVariableDeclarator(_this, kind, node) {
	if (UNSUPPORTED_DECLARATOR_ID_TYPES.has(node.id.type)) {
		throw new Error(`Unsupported VariableDeclarator.id.type "${node.id.type}".`);
	}

	if (node.id.type !== 'Identifier') {
		throw new Error('Unexpected node type for VariableDeclarator.id, expected Identifier.');
	}

	const { name } = node.id;

	const magic_unref_result = magicUnref(
		node.init,
		_this.script.refs,
	);

	_this.script.variables.add(name);
	_this.script.refs.set(
		name,
		REF,
	);

	if (magic_unref_result.refs_called.size > 0) {
		_this.script.ast_result.push(
			babelTypes.variableDeclaration(
				'const',
				[
					babelTypes.variableDeclarator(
						babelTypes.identifier(name),
						babelTypes.callExpression(
							babelTypes.identifier(
								_this._getCopperImportVariable('computed'),
							),
							[
								FUNCTION_EXPRESSION_TYPES.has(node.init.type)
									? node.init
									: babelTypes.arrowFunctionExpression(
										[],
										node.init,
									),
							],
						),
					),
				],
			),
		);
	}
	else if (kind === 'let') {
		_this.script.ast_result.push(
			babelTypes.variableDeclaration(
				'const',
				[
					babelTypes.variableDeclarator(
						babelTypes.identifier(name),
						babelTypes.callExpression(
							babelTypes.identifier(
								_this._getCopperImportVariable('ref'),
							),
							[
								node.init,
							],
						),
					),
				],
			),
		);
	}
	else if (kind === 'const') {
		_this.script.ast_result.push(
			babelTypes.variableDeclaration(
				'const',
				[
					babelTypes.variableDeclarator(
						babelTypes.identifier(name),
						node.init,
					),
				],
			),
		);
	}
}

/*
// parses ObjectPattern and ArrayPattern
function parseVariableDeclaration(node) {
	const variables = [];

	for (const declaration of node.declarations) {
		variables.push(
			...parseVariableDeclaratorId(declaration.id),
		);
	}

	return variables;
}

function parseVariableDeclaratorId(node) {
	const variables = [];

	switch (node.type) {
		case 'Identifier':
			return [ node.name ];
		case 'ArrayPattern':
			for (const element of node.elements) {
				variables.push(
					...parseVariableDeclaratorId(element),
				);
			}
			break;
		case 'ObjectPattern':
			for (const property of node.properties) {
				variables.push(
					...parseVariableDeclaratorId(property),
				);
			}
			break;
		case 'RestElement':
			variables.push(
				...parseVariableDeclaratorId(node.argument),
			);
			break;
		case 'ObjectProperty':
			variables.push(
				...parseVariableDeclaratorId(node.value),
			);
			break;
		default:
			throw new Error(`Unexpected node type "${node.type}" in VariableDeclarator.id.`);
	}

	return variables;
}
*/
