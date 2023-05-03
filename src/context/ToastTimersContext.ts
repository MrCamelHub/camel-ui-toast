import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

const ToastTimersContext = createContext<Partial<[number[], Dispatch<SetStateAction<number[]>>]>>(
  []
);

export default ToastTimersContext;
