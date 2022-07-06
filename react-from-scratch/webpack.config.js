const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['regenerator-runtime/runtime.js', './src/index.js'], // where app starts and where to start building our files
  mode: 'production', // lets webpack know which mode we are working on
  /*
  the module object helps define how your exported js modules are transformed and
  which ones are included according to the given array of rules
   */
  module: {
    rules: [
      // the test and exclude properties are conditions to match the file against
      // for example below, it'll match anything outside of the node_modules and bower_components directories
      {
        // rule is about transforming our ES6 and JSX syntax
        // loader directs Webpack to use Babel
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        /*
        this rule is for processing CSS
        * since we're not pre-or-post processing our CSS, we just need to make
          sure to add style-loader and css-loader to the "use" property.
        * css-loader requires style-loader in order to work.
        * loader is a short hand for the "use" property, when only one loader is being utilized
         */
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  /*
  the resolve property allows us to specify which extensions Webpack will resolve--this
  allows us to import modules without needing to add their extensions
   */
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  /*
  The output property tells Webpack where to put our bundled code. The publicPath property
  specifies what directory the bundle should go in, and also tells webpack-dev-server where
  to serve files from.
   */
  output: {
    /*
    The publicPath is a special property that helps us with out dev server. It specifies
    the public URL of the directory--at least as far as webpack-dev-server will know or care.
     */
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  // we set up webpack-dev-server in the devServer property.
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    // tells our server where the bundle code actually is
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true
  },
  /*
  finally, since we want to use Hot Module Replacement so we don't have to constantly refresh to see our changes.
  All we do for that in terms of this file is instantiate a new instance of the plugin in the plugins property and
  make sure we set hotOnly to true in devServer.
   */
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
};
