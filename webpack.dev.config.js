const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const webpack = require("webpack");
require("dotenv").config({ path: ".env.dev" });

module.exports = merge(common(), {
  mode: "development",
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVER_API_URL: JSON.stringify(process.env.SERVER_API_URL),
      NOTIFICATION_API_URL: JSON.stringify(process.env.NOTIFICATION_API_URL),
      API_GATEWAY: JSON.stringify(process.env.API_GATEWAY),
    }),
  ],
});
