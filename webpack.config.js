const path = require('path');

module.exports = {
  entry: './src/index.js', // or your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Loaders for JS, CSS, etc.
    ],
  },
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      // Add other polyfills if needed
    }
  },
};
