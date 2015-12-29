const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const colors = require('./Resources/Private/JavaScript/Shared/Constants/Colors.js');
const vars = require('postcss-simple-vars');

module.exports = {
    entry: {
        Host: './Resources/Private/JavaScript/Host/index.js',
        Guest: './Resources/Private/JavaScript/Guest/index.js'
    },

    output: {
        filename: 'JavaScript/[name].js',
        path: path.resolve('./Resources/Public/')
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    stage: 0
                }
            },
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?limit=100000'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
            }
        ]
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        }),
        vars({
            variables: colors
        })
    ],

    resolve: {
        modulesDirectories: ['node_modules']
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('./Styles/Neos.css', {allChunks: true})
    ]
};