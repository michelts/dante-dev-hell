const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [new ESBuildMinifyPlugin({ target: 'es2015' })]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html", inject: "body" }),
    new CleanWebpackPlugin()
  ],
  resolve: { extensions: [".ts", ".js"] },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: 'ts',
              target: 'es2015',
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
          }
        ]
      }
    ]
  },
  mode: 'development',
  devtool: "eval-source-map",
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: false,
    host: "0.0.0.0"
  },
};
