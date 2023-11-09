
import { parse as parseHtml } from 'parse5';
import * as acorn             from 'acorn';

export default function (component_source_code) {
	const html_nodes = parseHtml(component_source_code).childNodes[0].childNodes[1].childNodes;

	for (const node of html_nodes) {
		const tag_name = node.tagName?.toLowerCase();

		if (tag_name === 'script') {
			if (this.script_ast) {
				throw new Error('More than one <script> tag found.');
			}

			this.script_ast = acorn.parse(
				node.childNodes[0].value,
				{
					sourceType: 'module',
					ecmaVersion: '2023',
				},
			);
		}
		else if (tag_name === 'style') {
			if (this.style) {
				throw new Error('More than one <style> tag found.');
			}

			this.style = node.childNodes[0].value;
		}
		else if (typeof tag_name === 'string') {
			if (this.element.nodes) {
				throw new Error('More than one custom element found.');
			}

			this.element.node = node;
			this.element.tag_name = tag_name;
		}
	}
}
