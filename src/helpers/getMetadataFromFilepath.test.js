import { sep } from 'path';

import { getMetadataFromFilepath } from './getMetadataFromFilepath';

describe('Metadata from file path "messages" type', () => {
	it('should get group and namespace from path of "message" type', () => {
		const filepath = './messages/buttons.ns.js'.replaceAll('/', sep);

		const result = getMetadataFromFilepath(filepath);

		expect(result).toEqual({
			isMessages: true,
			isTranslations: false,
			locale: undefined,
			namespace: 'buttons',
		});
	});

	it('should get group and namespace from path of "message" type with subfolder', () => {
		const filepath = './messages/folder/buttons.ns.js'.replaceAll('/', sep);

		const result = getMetadataFromFilepath(filepath);

		expect(result).toEqual({
			isMessages: true,
			isTranslations: false,
			locale: undefined,
			namespace: 'buttons',
		});
	});
});

describe('Metadata from file path "translations" type', () => {
	it('should get group, locale and namespace from path of "translations" type', () => {
		const filepath = './translations/en/buttons.ns.js'.replaceAll('/', sep);

		const result = getMetadataFromFilepath(filepath);

		expect(result).toEqual({
			isMessages: false,
			isTranslations: true,
			locale: 'en',
			namespace: 'buttons',
		});
	});

	it('should get group, locale and namespace from path of "translations" type with subfolder', () => {
		const filepath = './translations/myLocale/folder/buttons.ns.js'.replaceAll('/', sep);

		const result = getMetadataFromFilepath(filepath);

		expect(result).toEqual({
			isMessages: false,
			isTranslations: true,
			locale: 'myLocale',
			namespace: 'buttons',
		});
	});

	it('throw an exception if there are not enough path sections and the locale is probably missing', () => {
		const filepath = './translations/buttons.ns.js'.replaceAll('/', sep);

		const result = () => getMetadataFromFilepath(filepath);

		expect(result).toThrow(
			'reactIntlOrganizer: probably there is no locale directory inside "translations", cannot recognize a locale',
		);
	});
});

describe('Metadata from file path "unknown" type', () => {
	it('should throw an exception if group is not "messages" nor "translations"', () => {
		const filepath = './random/folder/buttons.ns.js'.replaceAll('/', sep);

		const result = () => getMetadataFromFilepath(filepath);

		expect(result).toThrow(
			'reactIntlOrganizer: *.ns.js should be only inside "messages" and "translations" folders at the root, "random" is not supported, see documentation',
		);
	});
});
