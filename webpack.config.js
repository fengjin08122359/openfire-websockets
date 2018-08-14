var webpack = require('webpack')
var path = require('path');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var precss = require('precss');
var cssnext = require('cssnext');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

module.exports = {
    entry :{
		h5:path.resolve(__dirname, 'src')+'/js/h5.js',
		pc:path.resolve(__dirname, 'src')+'/js/pc.js',
	},
    output: {
        path: path.resolve(__dirname, 'webpack')+'/js/',
        filename: '[name].min.js'
    },
	module: {
        rules: [
		  {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
			  fallback: "style-loader",
			  use: "css-loader"
			})
		  },
			{
			  test: /\.(png|jpg|gif)$/,
			  use: [
				  {
					loader: 'url-loader',
					options: {
						name: '[name].[hash:8].[ext]',
						limit:8192
					}
				  }
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
				  {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				  }
				]
			}
		]
    },
	plugins:[
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery",
	  'window.$': 'jquery',
    }),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}),
	new webpack.LoaderOptionsPlugin({
		options: {
			postcss: function() {
				return [autoprefixer, precss, cssnano, cssnext]
			},
		}
	}),
	new ExtractTextPlugin(path.resolve(__dirname, 'webpack')+"/css/[name].min.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
	],
};


