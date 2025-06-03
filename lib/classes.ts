
export const classNames = {
  base: {
    wrapper: "nexo-mdx-editor grid w-full !h-auto gap-4 p-3",
    editor_container: "editor-container w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-medium ring-offset-background empty:!p-0",
    editor: "editor-textarea w-full !h-auto resize-none",
    preview: "p-3 rounded border border-border preview-container"
  },

  toolbar: {
    wrapper: "bg-muted inline-flex space-x-[6px] items-center border border-border rounded-md px-2 py-1",
    wrapper_pinned: "sticky top-5 left-0 right-0",
    wrapper_default: "relative",
    container_left: "inline-flex gap-2 items-center justify-start flex-grow flex-wrap",
    container_preview_div: "text-sm text-muted-foreground font-medium inline-flex items-center gap-1",
    container_preview_icon: "size-4 inline-block text-muted-foreground",
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
      outline:
        "border border-border bg-accent dark:bg-muted text-foreground hover:border-primary",
      ghost:
        "border border-transparent bg-input/50 text-muted-foreground shadow-none hover:shadow-none hover:text-foreground hover:bg-background focus-within:border-primary",
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
export type classNamesType = typeof classNames;
export type classKeyType = keyof classNamesType;

