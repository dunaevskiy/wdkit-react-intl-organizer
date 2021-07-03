import { prepareMessages } from './prepareMessages';

describe('Prepare messages', () => {
	it('should merge exports with different namespaces', () => {
		const data = {
			'./messages/buttons.ns.js': { default: { next: 'Next' } },
			'./messages/page/labels.ns.js': { default: { age: 'Age' } },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const { messages } = prepareMessages(context);

		expect(messages).toEqual({
			buttons: { next: { defaultMessage: 'Next', id: 'buttons.next' } },
			labels: { age: { defaultMessage: 'Age', id: 'labels.age' } },
		});
	});

	it('should concat exports with same namespace', () => {
		const data = {
			'./messages/buttons.ns.js': { default: { next: 'Next' } },
			'./messages/page/buttons.ns.js': { default: { previous: 'Previous' } },
			'./messages/page/module/buttons.ns.js': { default: { current: 'Current' } },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const { messages } = prepareMessages(context);

		expect(messages).toEqual({
			buttons: {
				current: { defaultMessage: 'Current', id: 'buttons.current' },
				next: { defaultMessage: 'Next', id: 'buttons.next' },
				previous: { defaultMessage: 'Previous', id: 'buttons.previous' },
			},
		});
	});

	it('should detect conflicts of the identical keys within same namespace', () => {
		const data = {
			'./messages/buttons.ns.js': { default: { next: 'Next' } },
			'./messages/page/buttons.ns.js': { default: { next: 'Different next' } },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const result = () => prepareMessages(context);

		expect(result).toThrow(
			'reactIntlOrganizer: message key conflict at namespace "buttons" - key "next" is declared multiple times',
		);
	});
});

describe('Prepare translations', () => {
	it('should add unknown translation to each locale', () => {
		const data = {
			'./translations/ru/buttons.ns.js': { default: {} },
			'./translations/de/buttons.ns.js': { default: {} },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const { translations } = prepareMessages(context);

		expect(translations).toEqual({ ru: { unknown: '??' }, de: { unknown: '??' } });
	});

	it('should merge exports with different namespaces', () => {
		const data = {
			'./translations/ru/buttons.ns.js': { default: { next: 'Next' } },
			'./translations/ru/page/labels.ns.js': { default: { age: 'Age' } },
			'./translations/en_GB/buttons.ns.js': { default: { next: 'Next2' } },
			'./translations/en_GB/page/labels.ns.js': { default: { age: 'Age2' } },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const { translations } = prepareMessages(context);

		expect(translations).toEqual({
			ru: {
				'buttons.next': 'Next',
				'labels.age': 'Age',
				'unknown': '??',
			},
			en_GB: {
				'buttons.next': 'Next2',
				'labels.age': 'Age2',
				'unknown': '??',
			},
		});
	});

	it('should concat exports with same namespace', () => {
		const data = {
			'./translations/en/buttons.ns.js': { default: { next: 'Next' } },
			'./translations/en/page/module/buttons.ns.js': { default: { current: 'Current' } },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const { translations } = prepareMessages(context);

		expect(translations).toEqual({
			en: {
				'buttons.current': 'Current',
				'buttons.next': 'Next',
				'unknown': '??',
			},
		});
	});

	it('should detect conflicts of the identical keys within same namespace', () => {
		const data = {
			'./translations/en/buttons.ns.js': { default: { next: 'Next' } },
			'./translations/en/page/module/buttons.ns.js': { default: { next: 'Different next' } },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const result = () => prepareMessages(context);

		expect(result).toThrow(
			'reactIntlOrganizer: translation key conflict at locale "en" namespace "buttons" - key "next" is declared more than one time, check all namespace files',
		);
	});
});

describe('Prepare locales', () => {
	it('should export all unique locales', () => {
		const data = {
			'./translations/en/button.ns.js': { default: {} },
			'./translations/en_GB/button.ns.js': { default: {} },
			'./translations/randomValue/path/button.ns.js': { default: {} },
		};
		const context = (filepath) => data[filepath];
		context.keys = () => Object.keys(data);

		const result = prepareMessages(context);
		const locales = result?.locales ?? [];

		expect(locales.sort()).toEqual(['en', 'en_GB', 'randomValue']);
	});
});
