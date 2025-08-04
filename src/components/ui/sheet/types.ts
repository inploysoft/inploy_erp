import * as SheetPrimitive from '@radix-ui/react-dialog';
import { ComponentPropsWithoutRef } from 'react';

export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

export type SheetTriggerProps = React.ComponentProps<
  typeof SheetPrimitive.Trigger
>;

export type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

export type SheetPortalProps = React.ComponentProps<
  typeof SheetPrimitive.Portal
>;

export type SheetOverlayProps = React.ComponentPropsWithoutRef<
  typeof SheetPrimitive.Overlay
>;

export type SheetContentProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Content
> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export type SheetHeaderProps = React.ComponentProps<'div'>;

export type SheetFooterProps = React.ComponentProps<'div'>;

export type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

export type SheetDescriptionProps = ComponentPropsWithoutRef<
  typeof SheetPrimitive.Description
>;
