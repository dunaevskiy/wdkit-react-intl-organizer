import { transformBatchToContext } from './transformBatchToContext';

describe('Batch to Require.Context transformation', () => {
	it('should transform values', () => {
		// Variable batch is a result of import * as batch from './**/*.ns.js';
		const batch = {
			messages$buttons: {
				next: 'Default Next {type}',
				previous: { defaultMessage: 'Default Previous {type}' },
			},
			messages$submodule$buttons: { last: 'Default Last {type}' },
			messages$titles: { primary: 'Primary default title', secondary: 'Secondary default title' },
			translations$en$buttons: { next: 'Next {type}', previous: 'Previous {type}' },
			translations$en$submodule$buttons: { last: 'Last {type}' },
			translations$en$titles: { primary: 'Primary title' },
		};

		const result = transformBatchToContext(batch);

		expect(result.keys().sort()).toEqual([
			'./messages/buttons',
			'./messages/submodule/buttons',
			'./messages/titles',
			'./translations/en/buttons',
			'./translations/en/submodule/buttons',
			'./translations/en/titles',
		]);

		expect(result(result.keys().sort()[0])).toEqual({
			default: batch.messages$buttons,
		});
		expect(result(result.keys().sort()[1])).toEqual({
			default: batch.messages$submodule$buttons,
		});
		expect(result(result.keys().sort()[2])).toEqual({
			default: batch.messages$titles,
		});
		expect(result(result.keys().sort()[3])).toEqual({
			default: batch.translations$en$buttons,
		});
		expect(result(result.keys().sort()[4])).toEqual({
			default: batch.translations$en$submodule$buttons,
		});
		expect(result(result.keys().sort()[5])).toEqual({
			default: batch.translations$en$titles,
		});
	});
});
