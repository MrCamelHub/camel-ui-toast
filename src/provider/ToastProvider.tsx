import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import ToastTimersContext from '@context/ToastTimersContext';

function ToastProvider({ children }: PropsWithChildren) {
  const value = useState([]);

  return <ToastTimersContext.Provider value={value}>{children}</ToastTimersContext.Provider>;
}

export default ToastProvider;
