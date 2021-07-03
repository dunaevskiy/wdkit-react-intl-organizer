import warning from 'warning';
import { isValidElement } from './isValidElement';

jest.mock('warning');

describe('Element checker', () => {
	const ns = 'ns';
	const key = 'key';
	const warningMessage = 'message';
	const warningCallback = jest.fn();

	beforeEach(() => {
		warning.mockClear();
		warningCallback.mockClear();
	});

	it('should call warning but ignore warningCallback when element exists', () => {
		const element = 'value';

		const result = isValidElement(element, ns, key, warningMessage, warningCallback);

		expect(result).toBeTruthy();
		expect(warning.mock.calls.length).toBe(1);
		expect(warning.mock.calls[0]).toEqual([element, warningMessage]);
		expect(warningCallback.mock.calls.length).toBe(0);
	});

	it('should call warning and warningCallback when element does not exist', () => {
		const element = null;

		const result = isValidElement(element, ns, key, warningMessage, warningCallback);

		expect(result).toBeFalsy();
		expect(warning.mock.calls.length).toBe(1);
		expect(warning.mock.calls[0]).toEqual([element, warningMessage]);
		expect(warningCallback.mock.calls.length).toBe(1);
		expect(warningCallback.mock.calls[0][0]).toEqual({ ns, key, message: warningMessage });
	});
});
