import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (_jsx("input", { type: type, className: cn("flex h-8 w-full rounded-md border border-input bg-slate-100 hover:bg-slate-50 hover:text-accent-foreground dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 text-sm   file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50", className), ref: ref, ...props }));
});
Input.displayName = "Input";
export { Input };
