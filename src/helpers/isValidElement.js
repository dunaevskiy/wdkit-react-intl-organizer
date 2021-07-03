import warning from 'warning';

export const isValidElement = (element, ns, key, warningMessage, warningCallback) => {
	warning(element, warningMessage);
	if (!element) warningCallback({ ns, key, message: warningMessage });

	return !!element;
};
