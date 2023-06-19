import { useContext, useId } from 'react';
import type { PropsWithChildren } from 'react';

import createUniqueId from '@utils/createUniqId';
import type { GenericComponentProps } from '@mrcamelhub/camel-ui';
import ToastStatesContext from '@context/ToastStatesContext';

import type { ToastProps } from '@types';

export default function useToastStack() {
  const uniqueId = useId();
  const [, setToastStates] = useContext(ToastStatesContext);

  return ({
    children,
    bottom = 80,
    edgeSpacing = 20,
    autoHideDuration = 2000,
    transitionDuration = 225,
    ...props
  }: GenericComponentProps<PropsWithChildren<ToastProps>>) => {
    if (!setToastStates) return;

    const id = createUniqueId('toast') + uniqueId;

    setToastStates((prevState) => {
      return prevState.concat({
        id,
        open: false,
        close: false,
        openTimer: setTimeout(
          () =>
            setToastStates((prevToastStates) =>
              prevToastStates.map((prevToastState) => ({
                ...prevToastState,
                open: prevToastState.id === id ? true : prevToastState.open
              }))
            ),
          100
        ),
        closeTimer: setTimeout(
          () =>
            setToastStates((prevToastStates) =>
              prevToastStates.map((prevToastState) => ({
                ...prevToastState,
                close: prevToastState.id === id ? true : prevToastState.close
              }))
            ),
          autoHideDuration
        ),
        props: {
          children,
          bottom,
          edgeSpacing,
          autoHideDuration,
          transitionDuration,
          ...props
        }
      });
    });
  };
}
