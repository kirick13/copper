
export function compileElementAttribute(
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
			return {
				target: 'input_value_reactive',
				args: [
					attribute_value,
				],
			};
		}

		return {
			target: 'attribute_reactive',
			args: [
				attribute,
				attribute_value,
			],
		};
	}

	if (is_event) {
		return {
			target: 'listener',
			args: [
				attribute,
				attribute_value,
				modifiers,
			],
		};
	}

	return {
		target: 'attribute',
		args: [
			attribute,
			attribute_value,
		],
	};
}

export function compileComponentAttribute(
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

		return {
			target: 'property_reactive',
			args: [
				attribute,
				attribute_value,
			],
		};
	}

	if (is_event) {
		modifiers.push('.component');

		return {
			target: 'listener',
			args: [
				`copper:${attribute}`,
				attribute_value,
				modifiers,
			],
		};
	}

	throw new Error('Setting non-reactive component attributes is not supported yet.');
}
