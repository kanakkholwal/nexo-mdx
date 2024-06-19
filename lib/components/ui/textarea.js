import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "@/lib/utils";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("textarea", { className: cn("flex min-h-28 w-full rounded-md border border-input bg-background p-3 text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50", className), ref: ref, ...props }));
});
Textarea.displayName = "Textarea";
export { Textarea };
