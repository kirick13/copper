
import { writeFileSync } from 'node:fs';
import { parseTemplate } from '../src/old-compiler.js';

const code = `
	import { ref, reactive } from '/test/html/copper.js';

	const state = window.state = reactive({ count: 0 });
	const count = window.count = ref(0);
	const greeting = window.greeting = ref('Hello World!');

	const new_todo_title = ref('');
	const todo = window.todo = reactive([]);
	function addTodo() {
		todo.push({
			id: Date.now(),
			title: new_todo_title.value,
		});
		new_todo_title.value = '';
	}
`;

// const template_code = parseTemplate(`
// <div class="foo" :class="['_count_'+count.value]">
// 	<input type="text" disabled :value="greeting">
// 	<input type="text" :value.sync="greeting">
// 	<input type="button" value="click me" @click="alert('event timestamp = ' + $event.timeStamp)">
// 	<a href="https://1.1.1.1" @click.prevent="false">link with preventDefault()</a>
// 	<div>
// 		<input type="button" :disabled="count.value <= 0" value="-" @click="count.value--">
// 		Count: {{ count }}
// 		<input type="button" :disabled="count.value >= 9" value="+" @click="count.value++">
// 	</div>
// </div>
// `);

// before: 1685 bytes minified
// before: 1273 bytes minified, 543 bytes gzipped
// const template_code = parseTemplate(`
// <div>
// 	<input type="button" :disabled="state.count <= -9" value="-" @click="state.count--">
// 	Count: {{ state.count }}
// 	<input type="button" :disabled="state.count >= 9" value="+" @click="state.count++">
// </div>
// <cu if="state.count > 0">
// 	Count positive: {{ state.count }}
// 	<cu if="state.count < 5">
// 		<span style="color:green;">(ok)</span>
// 	</cu>
// 	<cu else>
// 		<span style="color:red;">(danger)</span>
// 	</cu>
// </cu>
// <cu else-if="state.count < 0">
// 	Count negative: {{ state.count }}
// </cu>
// <!-- <cu else>
// 	Count zero
// </cu> -->
// `);

const template_code = parseTemplate(`
<h4>Todo:</h4>
<div>
	<input type="text" :value.sync="new_todo_title">
	<input
		type="button"
		value="Add"
		@click="addTodo()"
		>
</div>
<cu if="todo.length > 0">
	<cu for="index, task of todo" key="task.id">
		<div>
			Task #{{ index.value + 1 }}: {{ task.value.title }}
			<input
				type="button"
				value="Remove"
				@click="todo.splice(index.value, 1)"
				>
		</div>
	</cu>
</cu>
<cu else>
	<i>No tasks to do.</i>
</cu>
`);

console.log();
console.log(template_code);

writeFileSync(
	'./test/html/component.js',
	code + ';\nimport { el, text, fragment, attr, reactiveAttr, reactiveInputValue, reactiveTextNode, reactiveIf, reactiveFor, listen } from "/test/html/copper.js";\nconst $root = document.querySelector("#app");\n' + template_code,
);
