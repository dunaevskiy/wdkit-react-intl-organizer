/**
 * Transforms babel glob batch to require.context imitation.
 * Requires babel-plugin-import-glob
 *
 * @param batch - result of import from babel-plugin-import-glob
 * @return Function - require.context imitation
 *
 * @example
 * import * as batch from './ ** /*.ns.js';
 * const context = transformBatchToContext(batch);
 */
export const transformBatchToContext = (batch) => {
	const data = {};
	const keys = Object.keys(batch).map((metaPath) => {
		const path = `./${metaPath.replace(/\$/g, '/')}`;
		data[path] = { default: batch[metaPath] };

		return path;
	});
	const context = (filepath) => data[filepath];
	context.keys = () => keys;

	return context;
};
