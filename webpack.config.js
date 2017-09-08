const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/js/index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {loader: 'ts-loader'}
                ]
            }
        ]
    },
    // https://github.com/pixijs/pixi-sound/issues/28
    // Resolve node fs module for pixi-sound.
    node: {fs: "empty"},
    plugins: [
        new HtmlWebpackPlugin({
            template: '!!pug-loader!src/index.pug'
        }),
        new CopyWebpackPlugin([
            {context: 'src/assets', from: '**/*', to: 'assets'}
        ])
    ]
};
