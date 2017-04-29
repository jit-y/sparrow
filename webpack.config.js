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
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  entry: {
    "main/index": "./src/main/index.js",
    "renderer/app": "./src/renderer/app.jsx",
    "renderer/auth": "./src/renderer/auth.jsx",
    "index": "./src/index.html",
    "auth": "./src/auth.html"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  }
}
