const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const app_mode = argv.mode || 'development';

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "./static/frontend"),
            filename: "[name].js",
        },
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader",
                },
            },
            ],
        },
        optimization: {
            minimize: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(app_mode)
            })
        ],
    };
};