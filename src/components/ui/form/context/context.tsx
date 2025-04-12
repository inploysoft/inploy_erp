import { createContext } from 'react';

import { FormFieldContextValue, FormItemContextValue } from '../utils/types';

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);
export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);
