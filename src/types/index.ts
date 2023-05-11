import type { HTMLAttributes } from 'react';

import type { CSSValue, GenericComponentProps } from '@mrcamelhub/camel-ui';

export interface ToastProps {
  open?: boolean;
  onClose?: () => void;
  bottom?: CSSValue;
  edgeSpacing?: number;
  autoHideDuration?: number;
  transitionDuration?: number;
  action?: {
    text: string;
    onClick: () => void;
  };
  disablePadding?: boolean;
}

export type ToastComponentProps = ToastProps &
  GenericComponentProps<Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>>;

export interface ToastState {
  id: number;
  open: boolean;
  close: boolean;
  openTimer: ReturnType<typeof setTimeout>;
  closeTimer: ReturnType<typeof setTimeout>;
  props: ToastComponentProps;
}
