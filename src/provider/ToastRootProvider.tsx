import { useContext, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import { Typography } from '@mrcamelhub/camel-ui';
import ToastStatesContext from '@context/ToastStatesContext';
import { StyledToast } from '@components/Toast/Toast.styles';

function ToastRootProvider() {
  const [toastStates = [], setToastStates] = useContext(ToastStatesContext);

  const [isMounted, setIsMounted] = useState(false);
  const [toastStackHeightMetrics, setToastStackHeightMetrics] = useState<number[][]>([]);

  const toastRootPortalRef = useRef<HTMLDivElement | null>(null);
  const toastMinHeightRef = useRef(44);
  const toastRefs = useRef<HTMLDivElement[]>([]);

  const setToastRef = (index: number) => (ref: HTMLDivElement | null) => {
    if (!ref) return;

    toastRefs.current[index] = ref;
  };

  useEffect(() => {
    if (toastStates.length) {
      const toastRoot = document.getElementById('toast-root') as HTMLDivElement;

      if (!toastRoot) {
        const newToastRoot = document.createElement('div');
        newToastRoot.id = 'toast-root';
        newToastRoot.style.position = 'fixed';
        newToastRoot.style.zIndex = '21';
        newToastRoot.setAttribute('role', 'presentation');

        toastRootPortalRef.current = newToastRoot;

        document.body.append(newToastRoot);

        setIsMounted(true);
      } else {
        toastRootPortalRef.current = toastRoot;

        setIsMounted(true);
      }
    } else {
      toastRootPortalRef.current?.remove();
      toastRootPortalRef.current = null;
      setIsMounted(false);
    }
  }, [toastStates]);

  useEffect(() => {
    if (!toastRefs.current.length || toastRefs.current.length === 1) {
      setToastStackHeightMetrics([]);
      return;
    }

    toastRefs.current.forEach((toastRef, index) => {
      if (!index || !toastRefs.current[index - 1]) return;

      const { clientHeight } = toastRefs.current[index - 1];

      if (clientHeight - toastMinHeightRef.current > 0) {
        setToastStackHeightMetrics((prevState) => [
          ...prevState.filter(([prevIndex, _]) => prevIndex !== index),
          [index, clientHeight - toastMinHeightRef.current]
        ]);
      } else {
        setToastStackHeightMetrics((prevState) =>
          prevState.filter(([prevIndex, _]) => prevIndex !== index)
        );
      }
    });
  }, [toastStates]);

  useEffect(() => {
    if (!toastStates || !setToastStates) return;

    toastStates
      .filter(({ close }) => close)
      .forEach(({ id, props: { transitionDuration, onClose } }, index) =>
        setTimeout(() => {
          toastRefs.current = toastRefs.current.filter((_, refIndex) => index !== refIndex);
          setToastStates((prevToastStates) =>
            prevToastStates.filter(({ id: prevToastStateId }) => prevToastStateId !== id)
          );
          if (onClose && typeof onClose === 'function') onClose();
        }, transitionDuration)
      );
  }, [toastStates, setToastStates]);

  if (!isMounted || !toastRootPortalRef.current) return null;

  return createPortal(
    toastStates.map(
      ({ id, open, close, props: { children, customStyle, bottom, action, ...props } }, index) => (
        <StyledToast
          {...props}
          key={`toast-${id}`}
          ref={setToastRef(index)}
          toastOpen={open}
          toastClose={close}
          toastHeight={Number(
            String(
              customStyle?.height || customStyle?.minHeight || toastMinHeightRef.current
            ).replace(/\D/g, '')
          )}
          toastMinHeight={toastMinHeightRef.current}
          toastStackHeight={toastStackHeightMetrics
            .filter(([stackIndex, _]) => stackIndex <= index)
            .reduce((a, b) => a + b[1], 0)}
          index={index}
          bottom={toastStates[0]?.props?.bottom || bottom}
          hasAction={!!action}
          css={customStyle}
        >
          <Typography weight="medium" color="uiWhite" noWrap={!!action}>
            {children}
          </Typography>
          {action && (
            <Typography
              weight="medium"
              color="ui80"
              onClick={action.onClick}
              customStyle={{
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              {action.text}
            </Typography>
          )}
        </StyledToast>
      )
    ),
    toastRootPortalRef.current
  );
}

export default ToastRootProvider;
