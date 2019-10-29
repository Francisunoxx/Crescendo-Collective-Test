const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        resolve: {
          extensions: [".js", ".jsx"]
        },
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]_[local]_[hash:base64]",
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:12].[ext]",
              outputPath: "assets"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
              webp: {
                quality: 75
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:12].[ext]",
              outputPath: "fonts"
            }
          }
        ]
      },
      {
        type: "javascript/auto",
        test: /\.json$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash:12].[ext]"
            }
          }
        ]
      }
    ]
  },
  target: "node",
  performance: {
    hints: process.env.NODE_ENV === "production" ? "warning" : false
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [new ExtractTextPlugin("index.css"), HtmlWebpackPluginConfig]
};
