import { useContext, useEffect, useRef, useState } from 'react';

import createUniqueId from '@utils/createUniqId';
import ToastStatesContext from '@context/ToastStatesContext';

import { ToastComponentProps } from '@types';

function Toast({
  children,
  open,
  bottom = 100,
  edgeSpacing = 20,
  autoHideDuration = 2000,
  transitionDuration = 225,
  ...props
}: ToastComponentProps) {
  const [toastStates = [], setToastStates] = useContext(ToastStatesContext);

  const [id, setId] = useState(0);
  const [hasToastState, setHasToastState] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    if (open && !id) setId(createUniqueId(`toast-${toastStates.length}`));
  }, [open, toastStates, id]);

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
            transitionDuration
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
