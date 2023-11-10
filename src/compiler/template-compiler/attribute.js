
import { getAstListener }           from './ast/listener.js';
import { getAstReactiveAttribute }  from './ast/reactive-attribute.js';
import { getAstReactiveInputValue } from './ast/reactive-input-value.js';
import { getAstReactiveProperty }   from './ast/reactive-property.js';
import { getAstSetAttribute }       from './ast/set-attribute.js';

export function compileElementAttribute(
	variable,
	{
		is_bind,
		is_event,
		attribute,
		modifiers,
	},
	attribute_value,
) {
	if (is_bind) {
		if (modifiers.includes('sync')) {
			return getAstReactiveInputValue(
				variable,
				attribute_value,
			);
		}

		return getAstReactiveAttribute(
			variable,
			attribute,
			// modifiers,
			attribute_value,
		);
	}

	if (is_event) {
		return getAstListener(
			variable,
			attribute,
			attribute_value,
			modifiers,
		);
	}

	return getAstSetAttribute(
		variable,
		attribute,
		attribute_value,
	);
}

export function compileComponentAttribute(
	variable,
	{
		is_bind,
		is_event,
		attribute,
		modifiers,
	},
	attribute_value,
) {
	if (is_bind) {
		if (modifiers.includes('sync')) {
			throw new Error('Reactive props with .sync modifier are not supported on components yet.');
		}

		return getAstReactiveProperty(
			variable,
			attribute,
			attribute_value,
		);
	}

	if (is_event) {
		modifiers.push('.component');

		return getAstListener(
			variable,
			`copper:${attribute}`,
			attribute_value,
			modifiers,
		);
	}

	throw new Error('Setting non-reactive component attributes is not supported yet.');
}
