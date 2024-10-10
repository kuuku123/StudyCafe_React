const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");
require("dotenv").config({ path: ".env.prod" });

module.exports = merge(common(), {
  mode: "production",
  output: {
    filename: "bundle.[hash].js",
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER_API_URL: JSON.stringify(process.env.SERVER_API_URL),
    }),
  ],
});
