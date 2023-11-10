
const IMPORTS = [
	'el',
	'text',
	'fragment',
	'attr',
	'reactiveAttr',
	'reactiveInputValue',
	'reactiveTextNode',
	'reactiveIf',
	'reactiveFor',
	'reactiveProp',
	'listen',
	'CopperElement',
];

export function getAstsImports() {
	return [
		{
			type: 'ImportDeclaration',
			specifiers: IMPORTS.map((name) => ({
				type: 'ImportSpecifier',
				shorthand: true,
				imported: {
					type: 'Identifier',
					name,
				},
				local: {
					type: 'Identifier',
					name,
				},
			})),
			source: {
				type: 'Literal',
				value: 'copper',
			},
		},
	];
}
