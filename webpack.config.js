const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [new HtmlWebpackPlugin({template: path.resolve(__dirname, "public/index.html")})]
};