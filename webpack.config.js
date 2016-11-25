var webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            './webapp/js/index.js'
        ]
        /*,
        index: [
            './webapp/js/index.js'
        ],
        history: [
            './webapp/js/history.js'
        ]
        */
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
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]

};