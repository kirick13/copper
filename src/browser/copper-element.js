
import { CopperState } from './copper-state.js';

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

		this._copper = new CopperState(this);
	}

	#is_ready = false;
	init(state) {
		this.render(state);
	}

	render(...elements) {
		this.root.append(
			...elements,
		);
	}

	connectedCallback() {
		if (!this.#is_ready) {
			this.#is_ready = true;
			this.init();
		}

		this.onMount?.();
	}

	disconnectedCallback() {
		// console.log('Custom element removed from page.', this);
		// this.onMount?.();
	}

	emit(event_name, value) {
		this.dispatchEvent(
			new CustomEvent(
				`copper:${event_name}`,
				{
					detail: value,
				},
			),
		);
	}
}
