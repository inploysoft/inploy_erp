import * as React from 'react';
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

import { DATA_ATTRIBUTES, FORM_STYLES } from './constants';
import { FormFieldContext, FormItemContext } from './context';
import { useFormField } from './hooks';
import type {
  FormControlProps,
  FormDescriptionProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from './types';

export const Form = FormProvider;

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const FormItem = ({ className, ...props }: FormItemProps) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot={DATA_ATTRIBUTES.FORM_ITEM}
        className={cn(FORM_STYLES.FORM_ITEM, className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
};

export const FormLabel = ({ className, ...props }: FormLabelProps) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot={DATA_ATTRIBUTES.FORM_LABEL}
      data-error={!!error}
      className={cn(FORM_STYLES.FORM_LABEL_ERROR, className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};

export const FormControl = ({ ...props }: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      data-slot={DATA_ATTRIBUTES.FORM_CONTROL}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

export const FormDescription = ({
  className,
  ...props
}: FormDescriptionProps) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot={DATA_ATTRIBUTES.FORM_DESCRIPTION}
      id={formDescriptionId}
      className={cn(FORM_STYLES.FORM_DESCRIPTION, className)}
      {...props}
    />
  );
};

export const FormMessage = ({ className, ...props }: FormMessageProps) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot={DATA_ATTRIBUTES.FORM_MESSAGE}
      id={formMessageId}
      className={cn(FORM_STYLES.FORM_MESSAGE, className)}
      {...props}
    >
      {body}
    </p>
  );
};
