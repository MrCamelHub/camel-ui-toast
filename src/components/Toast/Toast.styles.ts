import { convertNumberToCSSValue } from '@mrcamelhub/camel-ui';
import styled, { CSSObject } from '@emotion/styled';

import type { ToastProps } from '@types';

export const StyledToast = styled.div<
  Pick<ToastProps, 'bottom' | 'edgeSpacing' | 'transitionDuration' | 'disablePadding'> & {
    toastOpen: boolean;
    toastClose: boolean;
    toastHeight: number;
    toastStackHeight: number;
    index: number;
    hasAction: boolean;
  }
>`
  position: fixed;
  left: 50%;
  bottom: ${({ bottom = 0 }) => convertNumberToCSSValue(bottom)};
  transform: ${({ index, toastHeight, toastStackHeight }) =>
    `translate(-50%, -${(toastHeight + 8) * index + toastStackHeight}px) scale(0.7, 0.7)`};
  width: ${({ edgeSpacing }) => `calc(100% - ${(edgeSpacing || 0) * 2}px)`};
  display: flex;
  align-items: center;
  justify-content: ${({ hasAction }) => (hasAction ? 'space-between' : 'center')};
  gap: 8px;
  padding: ${({ hasAction }) => (hasAction ? '12px' : '12px 20px')};
  border-radius: 8px;
  background-color: ${({
    theme: {
      palette: { common }
    }
  }) => common.ui20};
  z-index: ${({ theme: { zIndex } }) => zIndex.toast};
  text-align: center;
  visibility: hidden;
  opacity: 0;
  transition: opacity ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1)
      0ms,
    transform ${({ transitionDuration }) => transitionDuration}ms cubic-bezier(0, 0, 0.2, 1) 0ms;

  ${({ disablePadding }): CSSObject =>
    disablePadding
      ? {
          padding: 0
        }
      : {}}

  ${({ toastOpen, index, toastHeight, toastStackHeight }): CSSObject =>
    toastOpen
      ? {
          visibility: 'visible',
          opacity: 1,
          transform: `translate(-50%, -${
            (toastHeight + 8) * index + toastStackHeight
          }px) scale(1, 1)`
        }
      : {}}
  ${({ toastClose, index, toastHeight, toastStackHeight }): CSSObject =>
    toastClose
      ? {
          opacity: 0,
          transform: `translate(-50%, -${
            (toastHeight + 8) * index + toastStackHeight
          }px) scale(0.7, 0.7)`
        }
      : {}}
`;
