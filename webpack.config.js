var webpack = require('webpack');

module.exports = {
    entry: {
        index: [
            './webapp/js/index.js'
        ],
        confirm: [
            './webapp/js/confirm.js'
        ],
        autho: [
            './webapp/js/autho.js'
        ],
        signup: [
            './webapp/js/signup.js'
        ],
        landing: [
            './webapp/js/landing.js'
        ],
        profile: [
            './webapp/js/profile.js'
        ],
        test: [
            './webapp/js/test.js'
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
                'NODE_ENV': JSON.stringify('development')//JSON.stringify("production")
            }
        })
    ]

};