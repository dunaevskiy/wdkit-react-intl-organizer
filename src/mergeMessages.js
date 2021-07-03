import { makeFindMessage } from './helpers/makeFindMessage';
import { prepareMessages } from './helpers/prepareMessages';

export const mergeMessages = (context, warningCallback = () => {}) => {
	const { locales, messages, translations } = prepareMessages(context);

	return {
		locales,
		messages,
		translations,
		getMessage: makeFindMessage(messages, warningCallback),
	};
};
