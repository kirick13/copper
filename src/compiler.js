
import { CompilerFlow }  from './compiler/flow.js';

export function compile(code) {
	return new CompilerFlow(code).result;
}
