const slsw = require("serverless-webpack");
const isLocal = slsw.lib.webpack.isLocal;
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
  devtool: "inline-source-map",
  target: "node",
  mode: "production",
  optimization: {
    minimize: false
  },
  context: __dirname,
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    symlinks: false
  }
};
