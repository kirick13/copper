
import { CopperState } from './copper-state.js';

function attachCss(name, css) {
	const style = document.createElement('style');
	style.setAttribute(
		'copper-component',
		name,
	);
	style.textContent = css;
	document.head.append(style);
}

export class CopperElement extends HTMLElement {
	root;

	constructor(options = {}) {
		super();

		if (typeof this.constructor.css === 'string') {
			attachCss(
				this.tagName.toLowerCase(),
				this.constructor.css,
			);

			delete this.constructor.css;
		}

		this.innerHTML = '';

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
		try {
			this.render(state);
		}
		catch (error) {
			console.error(error);
		}
	}

	render(...elements) {
		this.root.append(
			...elements,
		);
	}

	#connected = false;
	connectedCallback() {
		if (this.#connected === false) {
			this.#connected = true;

			if (!this.#is_ready) {
				this.#is_ready = true;
				this.init();
			}

			this.emit('#mounted');
		}
	}

	disconnectedCallback() {
		setTimeout(() => {
			if (this.isConnected === false) {
				this.#connected = false;
				this.onUnmount?.();

				this.emit('#unmounted');

				this._copper?.destroy();
			}
		});
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
