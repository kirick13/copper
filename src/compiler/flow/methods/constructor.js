
import { parse as parseJs }   from '@babel/parser';
import { parse as parseHtml } from 'parse5';

export default function (component_source_code) {
	for (const node_in_html of parseHtml(component_source_code).childNodes.find((node) => node.tagName === 'html').childNodes) {
		for (const node of node_in_html.childNodes ?? []) {
			const tag_name = node.tagName?.toLowerCase();

			if (tag_name === 'script') {
				if (this.script.source !== null) {
					throw new Error('More than one <script> tag found.');
				}

				this.script.source = node.childNodes[0].value;
				this.script.ast_source = parseJs(
					this.script.source,
					{
						sourceType: 'module',
						// ecmaVersion: '2023',
					},
				).program.body;
			}
			else if (tag_name === 'style') {
				if (this.style.source) {
					throw new Error('More than one <style> tag found.');
				}

				this.style.source = node.childNodes[0].value;
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
}
