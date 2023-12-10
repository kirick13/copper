
import {
	ref,
	readonly }         from 'vue';
import { CopperState } from './copper-state.js';

const SYMBOL_NO_VALUE = Symbol('NO_VALUE');

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

	props = {};
	#props_data = new Map();
	defineProps(options) {
		for (const [ prop_name, validator ] of Object.entries(options)) {
			let prop_value = SYMBOL_NO_VALUE;
			if (this.hasAttribute(prop_name)) {
				prop_value = this.getAttribute(prop_name);
			}
			else if (this.hasAttribute(`${prop_name}.number`)) {
				prop_value = Number.parseFloat(
					this.getAttribute(`${prop_name}.number`),
				);
			}
			else if (this.hasAttribute(`${prop_name}.boolean`)) {
				const attribute_value = this.getAttribute(`${prop_name}.boolean`);
				prop_value = attribute_value === 'true' || attribute_value === '1';
			}

			const is_validator_function = typeof validator === 'function';
			// try to validate the default value only if it was provided
			if (
				prop_value !== SYMBOL_NO_VALUE
				&& is_validator_function
				&& validator(prop_value) !== true
			) {
				throw new InvalidPropertyValueError(
					this,
					prop_name,
					prop_value,
				);
			}

			const prop_ref = ref(prop_value);

			this.#props_data.set(
				prop_name,
				{
					prop_ref,
					validator,
					is_validator_function,
				},
			);

			this.props[prop_name] = readonly(prop_ref);
		}
	}

	bindProp(prop_name, watcher) {
		if (this.#props_data.has(prop_name) !== true) {
			console.warn(`Property "${prop_name}" is not defined by component ${this.constructor.name}, so it cannot be passed to it.`);
			return;
		}

		const {
			prop_ref,
			validator,
			is_validator_function,
		} = this.#props_data.get(prop_name);

		this._copper.watch(
			watcher,
			(value) => {
				if (is_validator_function && validator(value) !== true) {
					throw new InvalidPropertyValueError(
						this,
						prop_name,
						value,
					);
				}

				prop_ref.value = value;
			},
			{
				immediate: true,
			},
		);
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

class InvalidPropertyValueError extends TypeError {
	constructor(element, prop_name, value) {
		console.error(
			'InvalidPropertyValueError happened on',
			element,
		);

		super(`Invalid value for property "${prop_name}" on component ${element.constructor.name}, got "${value}" of type ${typeof value}`);

		this.name = 'InvalidPropertyValueError';
	}
}
