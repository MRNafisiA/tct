const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    mode: "production",
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
        publicPath: "/build-webpack-prd/",
        filename: "[name].js",
        path: __dirname + "/build-webpack-prd/",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-modules-typescript-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
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
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ]
    },
    resolve: {
        extensions: [".eot", ".svg", ".ttf", ".woff", ".woff2", ".css", ".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [new MiniCssExtractPlugin()]
};