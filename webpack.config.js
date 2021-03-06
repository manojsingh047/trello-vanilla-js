const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"] // It's like a pipeline
      }
    ]
  },
  entry: {
    index: "./src/index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"], //picks from above mentioned entry key of object
      filename: "index.html"
    })
  ],
  devServer: {
    //optional
    port: 4000
  },
  devtool: "source-map"
};
