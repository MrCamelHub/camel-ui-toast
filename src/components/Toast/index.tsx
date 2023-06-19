import { useContext, useEffect, useId, useRef, useState } from 'react';

import ToastStatesContext from '@context/ToastStatesContext';

import { ToastComponentProps } from '@types';

function Toast({
  children,
  open,
  bottom = 80,
  edgeSpacing = 20,
  autoHideDuration = 2000,
  transitionDuration = 225,
  ...props
}: ToastComponentProps) {
  const id = useId();

  const [toastStates = [], setToastStates] = useContext(ToastStatesContext);

  const [hasToastState, setHasToastState] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (open && setToastStates && id && !initializedRef.current) {
      initializedRef.current = true;
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
            open,
            bottom,
            edgeSpacing,
            autoHideDuration,
            transitionDuration,
            ...props
          }
        });
      });
    }
  }, [
    open,
    setToastStates,
    id,
    autoHideDuration,
    children,
    bottom,
    edgeSpacing,
    transitionDuration,
    props
  ]);

  useEffect(() => {
    setHasToastState(toastStates.some(({ id: toastStateId }) => toastStateId === id));
  }, [toastStates, id]);

  useEffect(() => {
    if (!hasToastState && initializedRef.current) {
      initializedRef.current = false;
    }
  }, [hasToastState]);

  return null;
}

export default Toast;
