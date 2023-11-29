/* global Bun */
/* eslint-disable no-await-in-loop */

import { readFile } from 'node:fs/promises';
import { compile }  from '../../src/compiler.js';

for (const filename of new Set([
	'components/todo.copper',
	'components/todo-list.copper',
	'components/todo-title.copper',
])) {
	const source_code = await readFile(
		new URL(
			filename,
			import.meta.url,
		),
		'utf8',
	);

	const component_code = compile(source_code);
	console.log(component_code);

	await Bun.write(
		new URL(
			`dist/${filename.replace(/\.copper$/, '.js')}`,
			import.meta.url,
		),
		component_code,
	);
}
