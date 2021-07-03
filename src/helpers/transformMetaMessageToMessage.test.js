import { transformMetaMessageToMessage } from './transformMetaMessageToMessage';

describe('Transformation from meta message to message', () => {
	const namespace = 'ns';
	const data = {
		key: null,
		keyString: 'Default message',
		keyObjectValid: {
			id: 'random',
			defaultMessage: 'Default message',
		},
		keyObjectInvalid: {
			description: 'bar',
		},
	};

	it('should wrap a string message with an object and provide id', () => {
		const key = 'keyString';

		const result = transformMetaMessageToMessage(data, namespace, key);

		expect(result).toEqual({
			id: `${namespace}.${key}`,
			defaultMessage: data.keyString,
		});
	});

	it('should copy valid message object and rewrite object id', () => {
		const key = 'keyObjectValid';

		const result = transformMetaMessageToMessage(data, namespace, key);

		expect(result).toEqual({
			...data.keyObjectValid,
			id: `${namespace}.${key}`,
		});
	});

	it('should throw an exception if an object misses defaultMessage property', () => {
		const result = () => transformMetaMessageToMessage(data, namespace, 'keyObjectInvalid');

		expect(result).toThrow();
	});
});
