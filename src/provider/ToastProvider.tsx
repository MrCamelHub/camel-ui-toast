import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import ToastRootProvider from '@provider/ToastRootProvider';
import ToastStatesContext from '@context/ToastStatesContext';

import type { ToastState } from '@types';

function ToastProvider({ children }: PropsWithChildren) {
  const value = useState<ToastState[]>([]);

  return (
    <ToastStatesContext.Provider value={value}>
      {children}
      <ToastRootProvider />
    </ToastStatesContext.Provider>
  );
}

export default ToastProvider;
