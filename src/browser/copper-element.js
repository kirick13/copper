
export class CopperElement extends HTMLElement {
	root;

	constructor(options = {}) {
		super();

		const option_shadow = options.shadow ?? 'none';
		switch (option_shadow) {
			case 'open':
			case 'closed':
				this.root = this.attachShadow({
					mode: option_shadow,
				});
				break;
			case 'none':
				this.root = this;
				break;
			default:
				throw new Error(`Invalid "shadow" option: "${options.shadow}".`);
		}

		setTimeout(() => this.render());
	}

	render() {
		throw new Error('No render method found.');
	}
}
