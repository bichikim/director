module.exports = {
    node: {
        __dirname: true
    },
    entry: './test/app.js',
    output:{
        path: __dirname + '/test/',
        filename: 'index.js'
    },
    module:{
        loaders:[
            {
                test:/\.sass$/,
                loader: 'style!css!sass'
            }, {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query:{
                    presets : ['es2015', 'es2016']
                }
            }
        ]
    },
    devtool: 'source-map'
};