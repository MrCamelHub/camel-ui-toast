import { useContext } from 'react';
import type { PropsWithChildren } from 'react';

import createUniqueId from '@utils/createUniqId';
import type { GenericComponentProps } from '@mrcamelhub/camel-ui';
import ToastStatesContext from '@context/ToastStatesContext';

import type { ToastProps } from '@types';

export default function useToastStack() {
  const [, setToastStates] = useContext(ToastStatesContext);

  return ({
    children,
    bottom = 100,
    edgeSpacing = 20,
    autoHideDuration = 2000,
    transitionDuration = 225,
    ...props
  }: GenericComponentProps<PropsWithChildren<ToastProps>>) => {
    if (!setToastStates) return;

    const id = createUniqueId('toast');

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
          edgeSpacing
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
