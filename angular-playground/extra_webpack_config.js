const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      APPLICATION: 'micro'
    })
  ],
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? 'angular-playground.js' : '[name].js';
    }
  }
};
