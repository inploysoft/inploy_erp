import { createContext, useContext } from 'react';

export const CoreContext = createContext<object | undefined>(undefined);

// Required Definite Assignment Assertions(!)
export const useCoreContext = () => useContext(CoreContext)!;
