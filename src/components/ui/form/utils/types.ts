import { ComponentProps } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export type FormItemContextValue = {
  id: string;
};

export type FormItemProps = ComponentProps<'div'>;

export type FormLabelProps = ComponentProps<typeof LabelPrimitive.Root>;

export type FormControlProps = ComponentProps<typeof Slot>;

export type FormDescriptionProps = ComponentProps<'p'>;

export type FormMessageProps = ComponentProps<'p'>;
