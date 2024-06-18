const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    components: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'js/index.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.ts', '.js', '.less', '.css'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: ['cover 99.5%']
                  }
                }
              ]
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: { version: 3 },
                },
              ]
            ]
          },
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.css$/,
        loader: 'css-loader'
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/index.css",
    }),
  ],
};