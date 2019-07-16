const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  entry: {
    main: "./src/js/app.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          //{ loader: "style-loader" },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: { plugins: () => [autoprefixer()] }
          },
          {
            loader: "sass-loader",
            options: { plugins: () => [autoprefixer()] }
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importloaders: 1 } },
          { loader: "postcss-loader" }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      //options similar to same options in WebpackOptions.output
      //both options are optional
      filename: "[name].bundle.css",
      chunckFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      template: "./src/about.html",
      filename: "./about.html"
    })
  ]
};
