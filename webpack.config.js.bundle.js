"use strict";

const path = require("path");
const fs = require("fs");

const entryPoints = {};
const browserFiles = fs.readdirSync("./src/browser");
for (const browserFileName of browserFiles) {
    if ( !/^main\..*\.tsx$/.test(browserFileName) ) continue;
    entryPoints[ browserFileName.replace(/\.tsx$/, "") ] = `./src/browser/${browserFileName}`;
}

/**
 * @type {import("webpack-cli").ConfigOptions}
 */
module.exports = {
    entry: entryPoints,
    mode: "production",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist", "browser", "static"),
    }
};