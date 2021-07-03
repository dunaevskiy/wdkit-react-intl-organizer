import invariant from 'invariant';

export const getMetadataFromFilepath = (filepath) => {
	const pathParts = filepath.split(filepath[1]);
	const group = pathParts[1];

	invariant(
		['messages', 'translations'].includes(group),
		`reactIntlOrganizer: *.ns.js should be only inside "messages" and "translations" folders at the root, "${group}" is not supported, see documentation`,
	);

	const filename = pathParts[pathParts.length - 1];
	const filenameParts = filename.split('.');
	const namespace = filenameParts[0];
	let locale;

	if (group === 'translations') {
		invariant(
			pathParts.length >= 4,
			'reactIntlOrganizer: probably there is no locale directory inside "translations", cannot recognize a locale',
		);

		[, , locale] = pathParts;
	}

	return {
		isMessages: group === 'messages',
		isTranslations: group === 'translations',
		locale,
		namespace,
	};
};
