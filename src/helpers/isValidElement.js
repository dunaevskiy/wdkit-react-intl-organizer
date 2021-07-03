export const isValidElement = (element, ns, key, warningMessage, warningCallback) => {
	if (!element) {
		console.warn(warningMessage);
		warningCallback({ ns, key, message: warningMessage });
	}

	return !!element;
};
