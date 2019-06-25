const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Pig Dice',
      template: './src/index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: "eslint-loader"
      },

      // file loader
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/'
            }
          }
        ]
      },

      // // url loader
      // {
      //   test: /\.(png|jp(e*)g|svg)$/,
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //         limit: 8000, // Convert images < 8kb to base64 strings
      //         name: 'images/[hash]-[name].[ext]'
      //     }
      //   }]
      // },

      // html loader
      {
        test:/\.html$/,
        use: [
          'html-loader'
        ]
      },

    ]
  },
  node: {
    fs: 'empty'
  },
  // target: "web",
};
