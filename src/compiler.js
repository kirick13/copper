
import { generate } from 'astring';
import { inspect }  from 'node:util';
import { parse }    from 'parse5';

import { getAstProgram }             from './compiler/ast/program.js';
import { Converter } from './compiler/converter.js';

export function parseTemplate(html) {
	const program = getAstProgram();

	const document = parse(html);
	const element_html = document.childNodes[0];
	const element_body = element_html.childNodes[1];

	// console.log(
	// 	inspect(
	// 		element_body,
	// 		{
	// 			depth: null,
	// 			colors: true,
	// 		},
	// 	),
	// );

	const converter = new Converter(element_body);

	program.body = converter.ast;

	// console.log(
	// 	inspect(
	// 		program,
	// 		{
	// 			depth: null,
	// 			colors: true,
	// 		},
	// 	),
	// );

	return generate(program);
}
