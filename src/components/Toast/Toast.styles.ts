import { convertNumberToCSSValue } from '@mrcamelhub/camel-ui';
import styled, { CSSObject } from '@emotion/styled';

import type { ToastProps } from '@types';

export const StyledToast = styled.div<
  Pick<
    ToastProps,
    'bottom' | 'edgeSpacing' | 'transitionDuration' | 'fullWidth' | 'disablePadding'
  > & {
    toastOpen: boolean;
    toastClose: boolean;
    toastHeight: number;
    index: number;
  }
>`
  position: fixed;
  left: 50%;
  bottom: ${({ bottom = 0 }) => convertNumberToCSSValue(bottom)};
  transform: ${({ index, toastHeight }) => `translate(-50%, -${(toastHeight + 8) * index}px)`};
  width: ${({ edgeSpacing }) => `calc(100% - ${(edgeSpacing || 0) * 2}px)`};
  max-width: ${({ fullWidth }) => (fullWidth ? 'auto' : '335px')};
  max-height: 44px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({
    theme: {
      palette: { common }
    }
  }) => common.ui20};
  color: ${({
    theme: {
      palette: { common }
    }
  }) => common.uiWhite};
  z-index: ${({ theme: { zIndex } }) => zIndex.toast};
  text-align: center;

  visibility: hidden;
  opacity: 0;
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1)
      0ms,
    transform ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${({
    theme: {
      typography: { body1 }
    }
  }): CSSObject => ({
    fontSize: body1.size,
    fontWeight: body1.weight.medium,
    lineHeight: body1.lineHeight,
    letterSpacing: body1.letterSpacing
  })};

  ${({ disablePadding }): CSSObject =>
    disablePadding
      ? {
          padding: 0
        }
      : {}}

  ${({ toastOpen }): CSSObject =>
    toastOpen
      ? {
          visibility: 'visible',
          opacity: 1
        }
      : {}}
  ${({ toastClose }): CSSObject =>
    toastClose
      ? {
          opacity: 0
        }
      : {}}
`;
