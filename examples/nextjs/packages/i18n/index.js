import { mergeMessages } from '@wdkit/react-intl-organizer';

const context = require.context('./', true, /^\..*\.ns\.js$/);

const optionalCallback = ({ ns, key, message }) => {
   // Send report to error tracker
	console.error(message);
};

export const { locales, messages, translations, getMessage } = mergeMessages(context, optionalCallback);
