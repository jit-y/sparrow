const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"]
  },
  plugins: [
    new ExtractTextPlugin("style/index.css")
  ],
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "sass-loader"
          ]
        })
      },
      {
        test: /\.s?css$/,
        exclude: /index\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: "file-loader"
      }
    ]
  },
  entry: {
    "main/index": "./src/main/index.js",
    "renderer/app": "./src/renderer/app.jsx",
    "renderer/auth": "./src/renderer/auth.jsx",
    "style/index": "./src/style/index.scss",
    "index": "./src/index.html",
    "auth": "./src/auth.html"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  devtool: "source-map"
}
