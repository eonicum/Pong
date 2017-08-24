const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./source/EntryPoint.js",
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname, "distribution")
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
        new HtmlWebpackPlugin({
            template: "./source/assets/index.html",
            inject: "head"
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, "distribution"))
    ]
};
