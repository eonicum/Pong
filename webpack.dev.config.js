const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./source/EntryPoint.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "distribution"),
        library: "client"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./distribution"
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "source"),
            path.resolve(__dirname, "source/code")
        ],
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: "file-loader"
        }, {
            test: /\.html$/,
            loader: "raw-loader"
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./source/assets/index.html",
            inject: "head"
        })
    ]
};