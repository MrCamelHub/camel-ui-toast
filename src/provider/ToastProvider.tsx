import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import ToastRenderProvider from '@provider/ToastRenderProvider';
import ToastStatesContext from '@context/ToastStatesContext';

import type { ToastState } from '@types';

function ToastProvider({ children }: PropsWithChildren) {
  const value = useState<ToastState[]>([]);

  return (
    <ToastStatesContext.Provider value={value}>
      {children}
      <ToastRenderProvider />
    </ToastStatesContext.Provider>
  );
}

export default ToastProvider;
