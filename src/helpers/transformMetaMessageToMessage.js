import invariant from 'invariant';

export const transformMetaMessageToMessage = (data, namespace, key) => {
	const type = typeof data[key];
	const isObject = type === 'object' && data[key] !== null;
	const isString = type === 'string';

	if (isObject) {
		invariant(
			typeof data[key]?.defaultMessage === 'string',
			`reactIntlOrganizer: namespace "${namespace}" key "${key}" declared as an object should have defaultMessage property with appropriate message`,
		);
	}

	return {
		...(isString ? { defaultMessage: data[key] } : {}),
		...(isObject ? data[key] : {}),
		id: `${namespace}.${key}`,
	};
};
