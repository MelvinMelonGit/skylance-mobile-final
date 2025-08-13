require('dotenv').config(); // This loads .env into process.env

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
      adaptiveIcon: {
        foregroundImage: './app/assets/images/skylance-logo.png',
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
          image: './app/assets/images/skylance-logo-full.png',
          imageWidth: 175,
          imageHeight: 35,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        }
      ],
      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  },
};