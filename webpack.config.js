const path = require('path');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
};