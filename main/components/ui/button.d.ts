import { type VariantProps } from "class-variance-authority";
import * as React from "react";
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "default_light" | "success_light" | "warning_light" | "destructive_light" | "destructive" | "outline" | "secondary" | "ghost" | "success" | "dark" | "light" | "glass" | "gradient_blue" | "gradient_green" | "gradient_cyan" | "gradient_teal" | "gradient_lime" | "gradient_red" | "gradient_pink" | "gradient_purple" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | "icon" | "icon_sm" | "icon_lg" | "icon_xl" | null | undefined;
    width?: "default" | "sm" | "lg" | "full" | "xs" | "md" | null | undefined;
    rounded?: "none" | "default" | "full" | null | undefined;
    transition?: "none" | "damped" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
