import * as React from "react"

import { cn } from "@nexo-mdx/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-input bg-slate-100 hover:bg-slate-50 hover:text-accent-foreground dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white px-3 py-2 text-sm   file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

