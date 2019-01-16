const path = require('path');

const javascript = { test: /\.js$/, exclude: /mode_modules/, loader: "babel-loader" };
const css = { test: /\.css$/, loader: "style-loader" };

module.exports = {
  mode: 'development',
  entry: './public/filmTracker-app.js',

  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "[name].bundle.js"
  },

  module: {
    rules: [javascript, css]
  }
}