"use client";
import { cn } from "@nexo-mdx/lib/utils";
import { twClasses } from "@nexo-mdx/tailwind-classes";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
    twClasses.button.base,
    {
        variants: {
            variant: {
                ...twClasses.button.variant,
            },
            size: {
                ...twClasses.button.size
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }),"nexo-mdx-button")}
                ref={ref}
                type="button"
                {...props} />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants };

