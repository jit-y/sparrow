const path = require("path");

module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_moudules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /index\.scss$/,
        use: [
          { loader: "file-loader", options: { name: "style/index.css" }},
          { loader: "extract-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /index\.scss$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[path][name]__[local]--[hash:base64:5]"
            }
          },
          {loader: "sass-loader"}
        ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
      }
    ]
  },
  context: path.resolve(__dirname, "src"),
  entry: {
    "main/index": "./main/index.js",
    "renderer/app": "./renderer/app.jsx",
    "renderer/auth": "./renderer/auth.jsx",
    "style/index": "./style/index.scss",
    "index": "./index.html",
    "auth": "./auth.html"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  devtool: "source-map"
}
