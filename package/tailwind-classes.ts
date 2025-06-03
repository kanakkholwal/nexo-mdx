// Export all Tailwind classes as string literals
export const twClasses = {
  base:{
      wrapper:"nexo-mdx-editor grid w-full !h-auto gap-4 p-3",
      editor_container:"editor-container",
      editor:"w-full !h-auto resize-none",
      preview:"p-3 rounded border border-border preview-container"
  },

  toolbar: {
    wrapper: "flex flex-wrap gap-4 p-3 rounded-xl border border-border backdrop-blur-lg",
    wrapper_pinned: "sticky top-5 left-0 right-0",
    wrapper_default: "relative",
    container_left: "inline-flex gap-2 items-center justify-start flex-grow flex-wrap",
    container_preview_div: "text-sm text-muted-foreground font-medium inline-flex items-center gap-1",
    container_preview_icon: "size-4 inline-block",
    container_preview_title: "text-sm text-muted-foreground font-medium inline-flex items-center gap-1",
    container_preview_description: "text-xs text-muted italic",
  },


  // Components
  button: {
    base:
      "inline-flex items-center justify-center gap-2 whitespace-nowrap capitalize rounded-md text-sm font-medium tracking-wide ring-offset-background transition-transform transition-duration-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
    variant: {
      default: "bg-primary dark:bg-primary text-white hover:bg-primary/90",
      default_light:
        "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/10 dark:text-primary hover:dark:bg-primary/5 hover:dark:text-primary",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90",
      success_light:
        "bg-green-600/10 text-green-600 hover:bg-green-600/20 dark:bg-green-600/20 dark:text-green-600 hover:dark:bg-green-600/10 hover:dark:text-green-600",
      warning_light:
        "bg-yellow-600/10 text-yellow-600 hover:bg-yellow-600/20 dark:bg-yellow-600/20 dark:text-yellow-600 hover:dark:bg-yellow-600/10 hover:dark:text-yellow-600",
      destructive_light:
        "bg-red-600/10 text-red-600 hover:bg-red-600/20 dark:bg-red-600/5 dark:text-red-600 hover:dark:bg-red-600/10 hover:dark:text-red-600",
      destructive:
        "bg-red-100 hover:bg-red-200 text-red-700	dark:bg-red-700 dark:text-red-200 dark:hover:bg-red-800 dark:hover:text-red-200",
      outline:
        "border border-border bg-accent dark:bg-muted text-foreground hover:border-primary",
      ghost:
        "bg-slate-100/20 hover:bg-slate-100/80 backdrop-blur-md hover:text-accent-foreground dark:bg-accent dark:text-white dark:hover:bg-accent/80 dark:hover:text-white",
      success:
        "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-700",
      slate:
        "bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-950 dark:hover:text-slate-100",
      link: "text-primary underline-offset-4 hover:underline",
      dark: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200",

    },
    size: {
      default: "h-10 px-4 px-5 py-2.5 [&>svg]:size-5",
      xs: "h-6 rounded-md px-2.5 py-1.5 text-xs [&>svg]:size-3",
      sm: "h-8 rounded-md px-3 py-2 text-xs [&>svg]:size-4",
      lg: "px-5 py-3 text-base h-12 [&>svg]:size-6",
      xl: "px-6 py-3.5 text-base [&>svg]:size-8",
      icon: "h-10 w-10 p-3 [&>svg]:size-5",
      icon_sm: "h-8 w-8 p-2 [&>svg]:size-4",
      icon_lg: "h-12 w-12 p-3.5 [&>svg]:size-6",
      icon_xl: "h-14 w-14 p-4 [&>svg]:size-8",
    }
  },

} as const;

// Type for autocomplete in consuming apps
export type TwClasses = typeof twClasses;
export type TwClassKey = keyof TwClasses;


export const cssVariables = {
  "--background": "var(--background, hsl(0deg 0% 96.08%))",
  "--foreground": "var(--foreground, hsl(0deg 0% 9.8%))",
  "--card": "var(--card, hsl(0, 0%, 100%))",
  "--card-foreground": "var(--card-foreground, hsl(0deg 0% 9.8%))",
  "--popover": "var(--popover, hsl(0 0% 100%))",
  "--popover-foreground": "var(--popover-foreground, hsl(0deg 0% 9.8%))",
  "--primary": "var(--primary, hsla(262.1 83.3% 57.8%))",
  "--primary-foreground": "var(--primary-foreground, hsl(0deg 0% 92.16%))",
  "--secondary": "var(--secondary, hsla(217deg 61% 51%))",
  "--secondary-foreground": "var(--secondary-foreground, hsl(0deg 0% 92.16%))",
  "--muted": "var(--muted, hsl(210deg 40% 98.04%))",
  "--muted-foreground": "var(--muted-foreground, hsl(220 8.9% 46.1%))",
  "--accent": "var(--accent, hsl(0deg 0% 96.08%))",
  "--accent-foreground": "var(--accent-foreground, hsl(220.9 39.3% 11%))",
  "--destructive": "var(--destructive, hsl(0 84.2% 60.2%))",
  "--destructive-foreground": "var(--destructive-foreground, hsl(0deg 0% 92.16%))",
  "--border": "var(--border, hsl(220 13% 91%))",
  "--input": "var(--input, hsl(220 13% 91%))",
  "--ring": "var(--ring, hsl(262.1 83.3% 57.8%))",
  "--radius": "var(--radius, 0.5rem)",
} as const