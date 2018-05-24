const webpack = require("webpack");
const path = require("path");
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

let config = {
    mode: "production",
    entry: "./src/ovh-angular-sidebar-menu.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "./ovh-angular-sidebar-menu.min.js"
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jquery: 'jquery'
        }),
        new ngAnnotatePlugin({
            add: true,
            // other ng-annotate options here
        })
    ]
}

module.exports = config;
