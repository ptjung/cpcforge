const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
    const app_mode = argv.mode || 'development';
    const root_path = path.join(__dirname, '..', '..', '..');
    const dotenv = require('dotenv').config({ path: path.join(root_path, '.env') }).parsed;

    return {
        entry: "./src/index.jsx",
        output: {
            path: path.resolve(__dirname, "static/dist"),
            filename: "[name].js",
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.s?[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
            ],
        },
        optimization: {
            minimize: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(app_mode),
                'process.env.BASE_URL': JSON.stringify(dotenv.BASE_URL),
                'process.env.JWT_SECRET_KEY': JSON.stringify(dotenv.JWT_SECRET_KEY)
            })
        ],
    };
};