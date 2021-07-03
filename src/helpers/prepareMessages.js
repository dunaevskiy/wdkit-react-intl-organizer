import invariant from 'invariant';

import { getMetadataFromFilepath } from './getMetadataFromFilepath';
import { transformMetaMessageToMessage } from './transformMetaMessageToMessage';

export const prepareMessages = (context) => {
	const locales = new Set();
	const translations = {};
	const messages = {};

	context.keys().forEach((filepath) => {
		const { isMessages, isTranslations, locale, namespace } = getMetadataFromFilepath(filepath);
		const data = context(filepath).default;

		if (isMessages) {
			if (!messages[namespace]) messages[namespace] = {};

			// For each message key in the namespace
			Object.keys(data).forEach((key) => {
				invariant(
					typeof messages[namespace][key] === 'undefined',
					`reactIntlOrganizer: message key conflict at namespace "${namespace}" - key "${key}" is declared multiple times`,
				);

				messages[namespace][key] = transformMetaMessageToMessage(data, namespace, key);
			});
		}

		if (isTranslations) {
			locales.add(locale);
			if (!translations[locale]) translations[locale] = { unknown: '??' };

			// For each translation key in the namespace
			Object.keys(data).forEach((key) => {
				const id = `${namespace}.${key}`;

				invariant(
					typeof translations[locale][id] === 'undefined',
					`reactIntlOrganizer: translation key conflict at locale "${locale}" namespace "${namespace}" - key "${key}" is declared more than one time, check all namespace files`,
				);

				translations[locale][id] = data[key];
			});
		}
	});

	return { locales: [...locales], messages, translations };
};
