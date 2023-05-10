import type { HTMLAttributes } from 'react';

import type { CSSValue, GenericComponentProps } from '@mrcamelhub/camel-ui';

export interface ToastProps
  extends GenericComponentProps<Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>> {
  open: boolean;
  bottom?: CSSValue;
  edgeSpacing?: number;
  autoHideDuration?: number;
  transitionDuration?: number;
  fullWidth?: boolean;
  disablePadding?: boolean;
  onClose?: () => void;
}

export interface ToastState {
  id: number;
  open: boolean;
  close: boolean;
  openTimer: ReturnType<typeof setTimeout>;
  closeTimer: ReturnType<typeof setTimeout>;
  props: ToastProps;
}
