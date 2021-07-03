import { isValidElement } from './isValidElement';
import { makeFindMessage, unknownMessage } from './makeFindMessage';

jest.mock('./isValidElement');

describe('Message finder', () => {
	const messages = {
		buttons: {
			next: {
				id: 'buttons.next',
				defaultMessage: 'Next',
			},
		},
	};

	beforeEach(() => {
		isValidElement.mockClear();
	});

	it('should call checkElement twice and return message if it exists', () => {
		isValidElement.mockReturnValueOnce(true).mockReturnValueOnce(true);

		const result = makeFindMessage(messages, () => {})('buttons', 'next');

		expect(result).toEqual(messages.buttons.next);
		expect(isValidElement.mock.calls.length).toBe(2);
	});

	it('should call checkElement once and return unknown message if namespace does not exist', () => {
		isValidElement.mockReturnValueOnce(false);

		const result = makeFindMessage(messages, () => {})('ns', 'next');

		expect(result).toEqual(unknownMessage);
		expect(isValidElement.mock.calls.length).toBe(1);
	});

	it('should call checkElement twice and return unknown message if key does not exist', () => {
		isValidElement.mockReturnValueOnce(true).mockReturnValueOnce(false);

		const result = makeFindMessage(messages, () => {})('buttons', 'key');

		expect(result).toEqual(unknownMessage);
		expect(isValidElement.mock.calls.length).toBe(2);
	});
});
