const path = require('path'); // path is a default node module so we don't need to install it
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map', // defining which kind of source map webpack should generate if any
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // where the output should be stored
    filename: 'bundle.js',
    chunkFilename: '[id].js', // For the lazy loading
    publicPath: '', // Indiciates the folder structure will be the same structure as we deploy it
  },
  resolve: {
    extensions: ['.js', '.jsx'], // webpack will try to find the file with any of these extensions if no extension is defined
  },
  module: { // our own dependencies
    rules: [{
      test: /\.js$/,
      // Loader is a third patrty library which does something to the file
      loader: 'babel-loader', // babel loader is the standard for transpiling next generation JS to current gen JS
      exclude: /node_modules/, // Not transforming third party libraries because the are already optimized
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [{ // The order matters.. Webpack first use the right side element of the array (css-loader) moving to the left then, so first load the css imports (css-loader) and then put the css content in the top of the html file (style-loader)
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: { // Enabling css modules
          importLoaders: 1, // Informing css-loader how many loader we will run before the css-loader is applied
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            autoprefixer({
              browsers: ['> 1%', 'last 2 versions',],
            }),
          ],
        },
      },],
    }, {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url-loader?limit=8000&name=images/[name].[ext]',
    },],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};