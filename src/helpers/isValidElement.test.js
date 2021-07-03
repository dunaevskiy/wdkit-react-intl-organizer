import { isValidElement } from './isValidElement';

describe('Element checker', () => {
	const consoleWarn = console.warn;
	const ns = 'ns';
	const key = 'key';
	const warningMessage = 'message';
	const warningCallback = jest.fn();

	beforeAll(() => {
		console.warn = jest.fn();
	});

	beforeEach(() => {
		console.warn = jest.fn();
		warningCallback.mockClear();
	});

	afterEach(() => {
		console.warn.mockClear();
	});

	afterAll(() => {
		console.warn = consoleWarn;
	});

	it('should skip warning and warningCallback when element exists', () => {
		const element = 'value';

		const result = isValidElement(element, ns, key, warningMessage, warningCallback);

		expect(result).toBeTruthy();
		expect(console.warn.mock.calls.length).toBe(0);
		expect(warningCallback.mock.calls.length).toBe(0);
	});

	it('should call warning and warningCallback when element does not exist', () => {
		const element = null;

		const result = isValidElement(element, ns, key, warningMessage, warningCallback);

		expect(result).toBeFalsy();
		expect(console.warn.mock.calls.length).toBe(1);
		expect(console.warn.mock.calls[0]).toEqual([warningMessage]);
		expect(warningCallback.mock.calls.length).toBe(1);
		expect(warningCallback.mock.calls[0][0]).toEqual({ ns, key, message: warningMessage });
	});
});
