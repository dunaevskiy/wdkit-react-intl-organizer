const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		globalObject: 'this',
		library: {
			name: 'wdkitReactIntlOrganizer',
			type: 'umd',
			umdNamedDefine: true,
		},
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.m?jsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
		],
	},
	mode: 'production',
	externals: {
		'react': 'react',
		'prop-types': 'prop-types',
		'path': 'path',
	},
};
