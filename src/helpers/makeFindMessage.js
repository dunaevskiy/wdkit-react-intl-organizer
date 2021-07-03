import { isValidElement } from './isValidElement';

export const unknownMessage = { id: 'unknown', defaultMessage: '?' };

export const makeFindMessage = (messages, warningCallback) => (ns, key) => {
	const space = messages?.[ns];
	const message = space?.[key];
	let warningMessage;
	let isValid;

	warningMessage = `reactIntlOrganizer: namespace "${ns}" does not exist`;
	isValid = isValidElement(space, ns, key, warningMessage, warningCallback);
	if (!isValid) return unknownMessage;

	warningMessage = `reactIntlOrganizer: key "${key}" from namespace "${ns}" does not exist`;
	isValid = isValidElement(message, ns, key, warningMessage, warningCallback);
	if (!isValid) return unknownMessage;

	return message;
};
