import { useContext } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { FORM_ERROR_MESSAGES } from './constants';
import { FormFieldContext, FormItemContext } from './context';

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);

  const { getFieldState } = useFormContext();

  if (!fieldContext) {
    throw new Error(FORM_ERROR_MESSAGES.FORM_FIELD_CONTEXT);
  }

  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
