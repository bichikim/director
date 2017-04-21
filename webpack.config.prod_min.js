path = require('path');
const webpack = require('webpack');
module.exports = {
    node: {
        __dirname: true
    },
    entry: {
        main: path.join(__dirname, 'src', 'Waiter.js')
    },
    output:{
        path: __dirname,
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.sass$/,
                loader: 'style!css!sass'
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'es2016']
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};