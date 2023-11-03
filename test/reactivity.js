
import { ref } from '../src/main.js';

function wait() {
	console.log('----- timeout start');
	return new Promise((resolve) => {
		setTimeout(
			() => {
				console.log('----- timeout end');
				resolve();
			},
			100,
		);
	});
}

const a = ref(1);
console.log(a.value);

console.log('set to 2');
a.value = 2;

// await wait();

console.log('set to 1');
a.value = 1;
