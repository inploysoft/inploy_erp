export const FORM_ERROR_MESSAGES = {
  FORM_FIELD_CONTEXT: 'useFormField should be used within <FormField>',
} as const;

export const FORM_STYLES = {
  FORM_ITEM: 'grid gap-2',
  FORM_LABEL_ERROR: 'data-[error=true]:text-destructive',
  FORM_DESCRIPTION: 'text-muted-foreground text-sm',
  FORM_MESSAGE: 'text-destructive text-sm',
} as const;

export const DATA_ATTRIBUTES = {
  FORM_ITEM: 'form-item',
  FORM_LABEL: 'form-label',
  FORM_CONTROL: 'form-control',
  FORM_DESCRIPTION: 'form-description',
  FORM_MESSAGE: 'form-message',
} as const;
