import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

import type { ToastState } from '@types';

const ToastStatesContext = createContext<
  Partial<[ToastState[], Dispatch<SetStateAction<ToastState[]>>]>
>([]);

export default ToastStatesContext;
