module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    loader: '@storybook/addon-storysource/loader',
    options: { parser: 'typescript' },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};