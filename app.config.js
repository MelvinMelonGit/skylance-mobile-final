require('dotenv').config(); // This loads .env into process.env
const withMainActivityFix = require('./plugins/withMainActivityFix');

export default {
  expo: {
    name: 'skylance-mobile',
    slug: 'skylance-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './app/assets/images/icon.png',
    scheme: 'skylancemobile',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.tallmelon.skylancemobile"
    },
    android: {
      edgeToEdgeEnabled: true,
      package: 'com.tallmelon.skylancemobile',
      usesCleartextTraffic: true,
      adaptiveIcon: {
        foregroundImage: './app/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './app/assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './app/assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      withMainActivityFix
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  },
};