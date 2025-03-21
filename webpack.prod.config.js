const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
require("dotenv").config({ path: ".env.prod" });

module.exports = merge(common(), {
  mode: "production",
  output: {
    filename: "bundle.[hash].js",
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER_API_URL: JSON.stringify(process.env.SERVER_API_URL),
      NOTIFICATION_API_URL: JSON.stringify(process.env.NOTIFICATION_API_URL),
      API_GATEWAY_URL: JSON.stringify(process.env.API_GATEWAY_URL),
      API_GATEWAY_WS_URL: JSON.stringify(process.env.API_GATEWAY_WS_URL),
      AUTH_SERVER_URL: JSON.stringify(process.env.AUTH_SERVER_URL),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "public/.htaccess"), to: "." },
      ],
    }),
  ],
});
