const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      '@': path.resolve(__dirname, 'app'), // <-- adjust 'app' to your source folder if different
    },
  },
  watchFolders: [
    path.resolve(__dirname, 'app'),
  ],
};