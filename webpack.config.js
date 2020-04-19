const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var PrettierPlugin = require("prettier-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: [
    './src/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.(css|scss)$/, use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        }, //css only files
        { 
          test: /\.(png|svg|jpg|gif)$/, use: {
            loader: 'file-loader',
            options: { name: '[name].[ext]' } 
          }
        }, //for images
        { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, use: ['file-loader'] } //for fonts
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  devtool: "source-map",
  devServer: {
    contentBase:  './public',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({
      systemvars: true
  }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      Popper: 'popper.js',
      jQuery: 'jquery',
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    }),
    new HtmlWebpackPlugin({
        template: 'template.html',
        title: 'Camera App',
      }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
    new ManifestPlugin({
      filter: ({name}) => {
        !name.endsWith('.png')
        !name.endsWith('.map')
      },
      seed: {
        "short_name": "CameraApp",
        "name": "SnkrsDen Camera App",
        "description": "Take pictures of your sneakers to sell them on snkrsden.com",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "icon-120.png",
            "sizes": "120x120",
            "type": "image/png"
          },
          {
            "src": "icon-144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
          {
            "src": "icon-152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
          {
            "src": "icon-167.png",
            "sizes": "167x167",
            "type": "image/png"
          },
          {
            "src": "icon-180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "favicon.png",
            "sizes": "64x64",
            "type": "image/png"
          }
        ],
        "start_url": "/",
        "display": "standalone",
        "theme_color": "#99070c",
        "background_color": "#99070c"
      }
    }),
    new PrettierPlugin({
      parser: "babel",
      printWidth: 80,             // Specify the length of line that the printer will wrap on.
      tabWidth: 4,                // Specify the number of spaces per indentation-level.
      useTabs: true,              // Indent lines with tabs instead of spaces.
      bracketSpacing: true,
      extensions: [ ".js", ".jsx" ],
      jsxBracketSameLine: true,
      semi: true,                 // Print semicolons at the ends of statements.
      encoding: 'utf-8'           // Which encoding scheme to use on files
    })
  ]
};
