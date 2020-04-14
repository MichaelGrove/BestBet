const { join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

module.exports = {
	entry: join(__dirname, '/resources/index.js'),
	output: {
		path: join(__dirname, '/app/public'),
		filename: 'app.min.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
				},
			},
			{
				test: /.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader', 'postcss-loader',
				],
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
			chunkFilename: 'styles.css',
		}),
		new HtmlWebPackPlugin({
			template: './resources/index.html',
			filename: './index.html',
		}),
	],
};
