import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export const argTypes = { darkMode: { control: 'boolean' }, customStyle: { control: false } };

export const args = { darkMode: false };

export default preview;
