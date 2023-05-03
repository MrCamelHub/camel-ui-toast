import { useState } from 'react';

import { Button, ThemeProvider } from 'mrcamel-ui';
import type { Meta } from '@storybook/react';

import ToastProvider from '../../provider/ToastProvider';

import Toast from '.';

export default {
  title: 'Toast',
  component: Toast,
  decorators: [
    (Story, { args: { darkMode } }) => (
      <ThemeProvider theme={darkMode ? 'dark' : 'light'} disableResetCSS={false}>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </ThemeProvider>
    )
  ]
} as Meta<typeof Toast>;

export function Default({ ...args }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="solid" brandColor="primary" onClick={() => setIsOpen(!isOpen)}>
        Open
      </Button>
      <Toast open={isOpen} onClose={() => setIsOpen(false)} {...args}>
        Toast
      </Toast>
    </>
  );
}
