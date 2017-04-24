module.exports = {
  target: "electron",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_moudules/,
        loader: "babel-loader"
      },
      {
        test: /index\.html$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  entry: {
    "main/index": "./src/main/index.js",
    "renderer/app": "./src/renderer/app.jsx",
    "index": "./src/index.html"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  }
}
