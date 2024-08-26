"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @type {import("webpack-cli").ConfigOptions}
 */
module.exports = {
    entry: {
        AllTasksPageView: "./src/task/view/css/AllTasksPageView.css"
    },
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.css?$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
                type: "asset/inline"
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: (file) => 
                `browser/static/${file.chunk.name}.css`
        })
    ]
};