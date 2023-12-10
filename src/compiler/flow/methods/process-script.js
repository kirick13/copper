
import * as t    from '@babel/types';
import {
	REF,
	magicUnref } from '../../magic-unref.js';

export default function () {
	const content = [];

	for (const node of this.script.ast_source) {
		switch (node.type) {
			case 'VariableDeclaration':
				if (node.kind === 'var') {
					throw new Error('Variable declarations with "var" are not supported.');
				}

				content.push({
					type: 'variable',
					node,
				});
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
				// add to refs instantly because of hoisting
				this.script.variables.add(node.id.name);

				content.push({
					type: 'method',
					node,
				});
				break;
			case 'ExpressionStatement':
				if (
					node.expression.type === 'CallExpression'
					&& node.expression.callee.type === 'Identifier'
				) {
					switch (node.expression.callee.name) {
						case 'watch':
							content.push({
								type: 'watch',
								node: node.expression,
							});
							break;
						case 'onMounted':
						case 'onUnmounted':
							content.push({
								type: 'listen',
								event: 'copper:#' + node.expression.callee.name.slice(2).toLowerCase(),
								node: node.expression,
							});
							break;
						default:
							throw new Error(`Unexpected call of the function named "${node.expression.callee.name}" found at the top level of script.`);
					}
				}
				else {
					throw new Error(`Unexpected "${node.type}" found at the top level of script.`);
				}
				break;
			default:
				throw new Error(`Unexpected "${node.type}" found at the top level of script.`);
		}
	}

	const ast_hoisted = [];
	for (const { type, node, ...args } of content) {
		switch (type) {
			case 'variable':
				for (const declarator of node.declarations) {
					processVariableDeclarator(
						this,
						node.kind,
						declarator,
					);
				}
				break;
			case 'method':
				magicUnref(
					node,
					this,
				);

				ast_hoisted.push(
					t.variableDeclaration(
						'const',
						[
							t.variableDeclarator(
								t.identifier(node.id.name),
								t.callExpression(
									t.memberExpression(
										t.functionExpression(
											node.id,
											node.params,
											node.body,
											node.generator,
											node.async,
										),
										t.identifier('bind'),
									),
									[
										t.thisExpression(),
									],
								),
							),
						],
					),
				);
				break;
			case 'watch':
				magicUnref(
					node,
					this,
				);

				this.script.ast_result.push(
					t.expressionStatement(
						t.callExpression(
							t.memberExpression(
								t.memberExpression(
									t.thisExpression(),
									t.identifier('_copper'),
								),
								t.identifier('watch'),
							),
							node.arguments,
						),
					),
				);
				break;
			case 'listen':
				magicUnref(
					node,
					this,
				);

				this.script.ast_result.push(
					t.expressionStatement(
						t.callExpression(
							t.memberExpression(
								t.memberExpression(
									t.thisExpression(),
									t.identifier('_copper'),
								),
								t.identifier('listen'),
							),
							[
								t.stringLiteral(args.event),
								node.arguments[0],
							],
						),
					),
				);
				break;
			// no default
		}
	}

	this.script.ast_result.unshift(
		...ast_hoisted,
	);
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
	// props
	if (
		node.init.type === 'CallExpression'
		&& node.init.callee.type === 'Identifier'
		&& node.init.callee.name === 'defineProps'
	) {
		if (node.id.type !== 'ObjectPattern') {
			throw new Error('You have to use object desctructuring when using defineProps macro.');
		}

		_this.script.ast_constructor.push(
			t.expressionStatement(
				t.callExpression(
					t.memberExpression(
						t.thisExpression(),
						t.identifier('defineProps'),
					),
					node.init.arguments,
				),
			),
		);

		for (const property of node.id.properties) {
			if (
				property.type !== 'ObjectProperty'
				|| property.key.type !== 'Identifier'
				|| property.value.type !== 'Identifier'
			) {
				throw new Error('You have to use single-level object desctructuring when using defineProps macro.');
			}

			const prop_name = property.key.name;
			const prop_variable = property.value.name;

			_this.script.variables.add(prop_variable);
			_this.script.refs.set(
				prop_variable,
				REF,
			);

			_this.script.ast_result.push(
				t.variableDeclaration(
					'const',
					[
						t.variableDeclarator(
							t.identifier(prop_variable),
							t.memberExpression(
								t.memberExpression(
									t.thisExpression(),
									t.identifier('props'),
								),
								t.identifier(prop_name),
							),
						),
					],
				),
			);
		}

		_this.script.ast_result.push();
	}
	else {
		if (UNSUPPORTED_DECLARATOR_ID_TYPES.has(node.id.type)) {
			throw new Error(`Unsupported VariableDeclarator.id.type "${node.id.type}".`);
		}
		if (node.id.type !== 'Identifier') {
			throw new Error('Unexpected node type for VariableDeclarator.id, expected Identifier.');
		}

		const { name } = node.id;

		const magic_unref_result = magicUnref(
			node.init,
			_this,
		);

		_this.script.variables.add(name);

		// computed
		if (magic_unref_result.refs_called.size > 0) {
			_this.script.refs.set(
				name,
				REF,
			);

			_this.script.ast_result.push(
				t.variableDeclaration(
					'const',
					[
						t.variableDeclarator(
							t.identifier(name),
							t.callExpression(
								t.identifier(
									_this._getCopperImportVariable('computed'),
								),
								[
									FUNCTION_EXPRESSION_TYPES.has(node.init.type)
										? node.init
										: t.arrowFunctionExpression(
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
		// ref
		else if (kind === 'let') {
			_this.script.refs.set(
				name,
				REF,
			);

			_this.script.ast_result.push(
				t.variableDeclaration(
					'const',
					[
						t.variableDeclarator(
							t.identifier(name),
							t.callExpression(
								t.identifier(
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
		// constant
		else if (kind === 'const') {
			_this.script.ast_result.push(
				t.variableDeclaration(
					'const',
					[
						t.variableDeclarator(
							t.identifier(name),
							node.init,
						),
					],
				),
			);
		}
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
