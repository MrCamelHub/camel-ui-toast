import type { HTMLAttributes, MouseEvent, PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { createPortal } from 'react-dom';
import type { CSSValue, GenericComponentProps } from 'mrcamel-ui';

import { StyledToast } from './Toast.styles';

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

const Toast = forwardRef<HTMLDivElement, PropsWithChildren<ToastProps>>(function Toast(
  {
    children,
    open,
    bottom = '100px',
    edgeSpacing = 20,
    transitionDuration = 225,
    fullWidth,
    disablePadding,
    customStyle,
    ...props
  },
  ref
) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation();

  return createPortal(
    <StyledToast
      ref={ref}
      toastOpen={open}
      toastClose={!open}
      bottom={bottom}
      edgeSpacing={edgeSpacing}
      transitionDuration={transitionDuration}
      fullWidth={fullWidth}
      disablePadding={disablePadding}
      onClick={handleClick}
      css={customStyle}
      {...props}
    >
      {children}
    </StyledToast>,
    document.body
  );
});

export default Toast;
