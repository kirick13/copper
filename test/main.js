
import { writeFileSync } from 'node:fs';
import { parseTemplate } from '../src/compiler.js';

const code = `
	import { ref } from '/test/html/copper.js';

	const count = window.count = ref(0);
	const greeting = window.greeting = ref('Hello World!');
`;

const template_code = parseTemplate(`
<p class="foo" :class="['_count_'+count.value]">
	<input type="text" disabled :value="greeting">
	<input type="text" :value.sync="greeting">
	<p>
		<input type="button" :disabled="count.value <= 0" value="-" @click="count.value--">
		Count: {{ count }}
		<input type="button" :disabled="count.value >= 9" value="+" @click="count.value++">
	</p>
</p>
`);

console.log();
console.log(template_code);

writeFileSync(
	'./test/html/component.js',
	code + ';\nimport { el, text, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, listen } from "/test/html/copper.js";\nconst $root = document.querySelector("#app");\n' + template_code,
);
