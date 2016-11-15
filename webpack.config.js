var webpack = require('webpack');

module.exports = {
    entry: {
        review: [
            './js/review.js'
        ],
        index: [
            './js/index.js'
        ],
        history: [
            './js/history.js'
        ]
    },
    output: {
        path: __dirname + '/build/webpackd',
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
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]

};