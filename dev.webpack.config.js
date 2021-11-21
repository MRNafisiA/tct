const path = require("path");

module.exports = {
    name: "dev-config",
    mode: "development",
    entry: {
        ButtonExample: "./src/examples/ButtonExample.ts",
        CheckboxExample: "./src/examples/CheckboxExample.ts",
        RadioButtonExample: "./src/examples/RadioButtonExample.ts",
        ToggleExample: "./src/examples/ToggleExample.ts",
        FieldExample: "./src/examples/FieldExample.ts",
        GridExample: "./src/examples/GridExample.ts",
        TooltipExample: "./src/examples/TooltipExample.ts",
        ContainerExample: "./src/examples/ContainerExample.ts",
        SimpleContainerExample: "./src/examples/SimpleContainerExample.ts"
    },
    output: {
        publicPath: "/build-webpack-dev/",
        filename: "[name].js",
        path: path.resolve(__dirname, "build-webpack-dev"),
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-modules-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: '[name]_[local]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            }
        ]
    },
    resolve: {
        extensions: [".eot", ".svg", ".ttf", ".woff", ".woff2", ".css", ".ts", ".tsx", ".js", ".jsx"]
    },
    stats: {
        errorDetails: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        compress: true,
        port: 9000,
    },
};