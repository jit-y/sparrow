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
      }
    ]
  },
  entry: {
    "main/index": "./src/main/index.js"
  },
  output: {
    filename: "dist/js/[name].js"
  }
}
