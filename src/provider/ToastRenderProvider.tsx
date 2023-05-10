import { useContext, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import ToastStatesContext from '@context/ToastStatesContext';
import { StyledToast } from '@components/Toast/Toast.styles';

function ToastRenderProvider() {
  const [toastStates = [], setToastStates] = useContext(ToastStatesContext);

  const [isMounted, setIsMounted] = useState(false);

  const toastRootPortalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (toastStates.length) {
      const toastRoot = document.getElementById('toast-root') as HTMLDivElement;

      if (!toastRoot) {
        const newToastRoot = document.createElement('div');
        newToastRoot.id = 'toast-root';
        newToastRoot.style.position = 'fixed';
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
    if (!toastStates || !setToastStates) return;

    toastStates
      .filter(({ close }) => close)
      .forEach(({ id, props: { transitionDuration, onClose } }) =>
        setTimeout(() => {
          setToastStates((prevToastStates) =>
            prevToastStates.filter(({ id: prevToastStateId }) => prevToastStateId !== id)
          );
          if (onClose && typeof onClose === 'function') onClose();
        }, transitionDuration)
      );
  }, [toastStates, setToastStates]);

  if (!isMounted || !toastRootPortalRef.current) return null;

  return createPortal(
    toastStates.map(({ id, open, close, props: { children, customStyle, ...props } }, index) => (
      <StyledToast
        key={`toast-${id}`}
        {...props}
        toastOpen={open}
        toastClose={close}
        toastHeight={Number(
          String(customStyle?.height || customStyle?.minHeight || 44).replace(/\D/g, '')
        )}
        index={index}
        bottom={toastStates[0]?.props?.bottom || props.bottom}
        css={customStyle}
      >
        {children}
      </StyledToast>
    )),
    toastRootPortalRef.current
  );
}

export default ToastRenderProvider;
