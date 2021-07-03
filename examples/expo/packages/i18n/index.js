import { mergeMessages, transformBatchToContext } from '@wdkit/react-intl-organizer';
import * as batch from './**/*.ns.js';

const context = transformBatchToContext(batch);

const optionalCallback = ({ ns, key, message }) => {
	// Send report to error tracker
	// console.error(message);
};

export const { locales, messages, translations, getMessage } = mergeMessages(
	context,
	optionalCallback,
);
