const { withMainActivity } = require('@expo/config-plugins');

function fixSuperOnCreate(src) {
  return src.replace(
    /super\.onCreate\(null\);/,
    'super.onCreate(savedInstanceState);'
  );
}

const withMainActivityFix = config => {
  return withMainActivity(config, config => {
    if (config.modResults.language === 'kt') {
      config.modResults.contents = fixSuperOnCreate(config.modResults.contents);
    } else {
      throw new Error('Expected Kotlin MainActivity');
    }
    return config;
  });
};

module.exports = withMainActivityFix;