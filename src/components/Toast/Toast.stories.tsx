import { useState } from 'react';

import type { Meta } from '@storybook/react';
import { Button, Flexbox } from '@mrcamelhub/camel-ui';
import useToastStack from '@hooks/useToastStack';
import Toast from '@components/Toast';

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast
};

export function Default({ ...args }) {
  const [open, setOpen] = useState(false);
  const [openSecondToast, setOpenSecondToast] = useState(false);
  const [openThirdToast, setOpenThirdToast] = useState(false);

  return (
    <Flexbox gap={8}>
      <Button variant="solid" brandColor="primary" onClick={() => setOpen(!open)}>
        Open First Toast
      </Button>
      <Button
        variant="solid"
        brandColor="primary"
        onClick={() => setOpenSecondToast(!openSecondToast)}
      >
        Open Second Toast
      </Button>
      <Button
        variant="solid"
        brandColor="primary"
        onClick={() => setOpenThirdToast(!openThirdToast)}
      >
        Open Third Toast
      </Button>
      <Toast {...args} open={open} onClose={() => setOpen(false)}>
        First Toast
      </Toast>
      <Toast {...args} open={openSecondToast} onClose={() => setOpenSecondToast(false)}>
        Second Toast
      </Toast>
      <Toast {...args} open={openThirdToast} onClose={() => setOpenThirdToast(false)}>
        Third Toast
      </Toast>
    </Flexbox>
  );
}

export function Action({ ...args }) {
  const [open, setOpen] = useState(false);

  return (
    <Flexbox gap={8}>
      <Button variant="solid" brandColor="primary" onClick={() => setOpen(!open)}>
        Open Toast With Action
      </Button>
      <Toast
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        action={{
          text: 'Action',
          // eslint-disable-next-line no-alert
          onClick: () => alert('Action')
        }}
      >
        Toast With Action
      </Toast>
    </Flexbox>
  );
}

export function Stack() {
  const toastStack = useToastStack();

  return (
    <Button
      variant="solid"
      brandColor="primary"
      onClick={() =>
        toastStack({
          children: 'Toast Stack',
          // eslint-disable-next-line no-alert
          onClose: () => alert('Close')
        })
      }
    >
      Open Toast Stack
    </Button>
  );
}

export default meta;
