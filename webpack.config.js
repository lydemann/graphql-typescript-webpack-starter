var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

/* helper function to get into build directory */
var distPath = function (name) {
    if (undefined === name) {
        return path.join('dist');
    }
    return path.join('dist', name);
};

var webpack_opts = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        filename: distPath('server.js'),
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            'node_modules',
            'src',
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                test: /\.(ts$)/,
                ts: {
                    compiler: 'typescript',
                    configFileName: 'tsconfig.json'
                },
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ],
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loaders: 'awesome-typescript-loader'
            }
        ]
    },
    externals: [nodeExternals()]
};
module.exports = webpack_opts;
