
const queue = [];

function flush() {
	console.log('next tick'); // FIXME: remove
	while (queue.length > 0) {
		queue.shift()();
	}
}

/**
 * Adds a callback that will be executed on next tick of the event loop
 * @param {Function} task Callback
 */
export function nextTick(task) {
	// if queue was empty, schedule a flush
	if (queue.push(task) === 1) {
		setTimeout(flush);
	}
}
