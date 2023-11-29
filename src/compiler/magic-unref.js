
import traverse from '@babel/traverse';
import * as t   from '@babel/types';

export const REF = Symbol('REF');
export const REF_PROBABLY = Symbol('REF_PROBABLY');

export function magicUnref(ast, flow, refs) {
	const result = {
		ast,
		refs_called: new Set(),
	};

	// const { refs } = flow.script;
	refs ??= flow.script.refs;

	traverse(
		{
			type: 'File',
			program: {
				type: 'Program',
				body: [ ast ].flat(2),
			},
		},
		{
			enter(path) {
				if (path.node.__copper_skip) {
					path.skip();
				}
			},
			Identifier(path) {
				const variable = path.node.name;

				if (
					path.isReferencedIdentifier()
					&& path.scope.hasBinding(variable) === false
					&& refs.has(variable)
				) {
					result.refs_called.add(variable);

					switch (refs.get(variable)) {
						case REF: {
							const node_new = t.memberExpression(
								t.identifier(variable),
								t.identifier('value'),
							);
							node_new.__copper_skip = true;
							path.replaceWith(node_new);
						} break;
						case REF_PROBABLY: {
							const node_new = t.callExpression(
								t.identifier(
									flow._getCopperImportVariable('unref'),
								),
								[
									t.identifier(variable),
								],
							);
							node_new.__copper_skip = true;
							path.replaceWith(node_new);
						} break;
						// no default
					}

					path.skip();
				}
			},
			AssignmentExpression(path) {
				const node_left = path.node.left;
				switch (node_left.type) {
					case 'Identifier': {
						const variable = node_left.name;
						if (path.scope.hasBinding(variable) === false) {
							switch (refs.get(variable)) {
								case REF:
									path.node.left = t.memberExpression(
										t.identifier(variable),
										t.identifier('value'),
									);

									path.node.left.__copper_skip = true;
									break;
								case REF_PROBABLY:
									throw new Error('Cannot assign to imported property.');
								// no default
							}
						}
					} break;
					// no default
				}
			},
			// UpdateExpression(path) {
			// 	// TODO:
			// },
		},
	);

	return result;
}
