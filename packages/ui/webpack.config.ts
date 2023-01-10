import { config as dotenv } from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import path from "path";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import webpackDevServer from "webpack-dev-server";

dotenv();

const isDevelopment = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
  entry: [path.join(path.resolve(__dirname, "src"), "index.tsx")],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(path.resolve(__dirname, "src"), "index.html"),
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv().parsed),
    }),
    ...(isDevelopment
      ? [
          new ReactRefreshWebpackPlugin({
            overlay: true,
          }),
        ]
      : []),
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(woff|woff2|eot|ttf)$/, type: "asset/resource" },
      { test: /\.(png|jpeg|jpg)$/, type: "asset/resource" },
      { test: /\.svg$/, use: ["@svgr/webpack"] },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: {
      index: "index.html",
    },
    port: process.env.DEV_PORT || 3000,
    hot: true,
    proxy: {
      "/api": {
        target: process.env.API_URL || "http://localhost:3000",
      },
      "/ws": {
        target: process.env.API_URL || "http://localhost:3000",
      },
    },
  },
  mode: isDevelopment ? "development" : "production",
  externals: {
    "react-native-sqlite-storage": "react-native-sqlite-storage",
  },
};

export default config;
