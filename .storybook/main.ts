import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  previewHead: (head) => `
    ${head}
    <link rel='preload' href='https://static.mrcamel.co.kr/assets/css/CamelProductSans.css' />
  `
};
export default config;
