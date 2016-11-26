var webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            './webapp/js/index.js'
        ],
        confirm:[
            './webapp/js/confirm.js'
        ],
        autho: [
            './webapp/js/autho.js'
        ],
        signup:[
            './webapp/js/signup.js'
        ]
    },
    output: {
        path: __dirname + '/webapp/js',
        filename: "[name]_bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        })
    ]

};