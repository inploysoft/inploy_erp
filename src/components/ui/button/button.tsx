import { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { buttonVariants } from '@/components/ui/button/variants';
import { cn } from '@/shared/lib/utils';
import { VariantProps } from 'class-variance-authority';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
