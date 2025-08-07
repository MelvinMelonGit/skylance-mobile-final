// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the default Expo config
const config = getDefaultConfig(__dirname);

// Support for images/fonts in node_modules
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// Add custom path alias '@' -> app/
config.resolver.extraNodeModules = {
  '@': path.resolve(__dirname, 'app'),
};

// Include the app/ folder for file watching (optional but useful for monorepos)
config.watchFolders = [path.resolve(__dirname, 'app')];

module.exports = config;