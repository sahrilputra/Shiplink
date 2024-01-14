import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-700 shadow text-slate-50 hover:bg-red-800/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border shadow border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-blue-900 shadow text-white hover:bg-blue-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: " hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "shadow text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        redOutline: "shadow bg-white border border-red-700 text-red-700 hover:bg-red-50 hover:text-red-900 dark:bg-red-900 dark:border-red-900 dark:text-red-50 dark:hover:bg-red-900/80 dark:hover:text-red-50",
        tableBlue: "bg-blue-100 text-blue-900 border border-black border-opacity-20 hover:bg-blue-200 hover:text-blue-900 dark:bg-blue-900 dark:text-blue-50 dark:hover:bg-blue-900/80 dark:hover:text-blue-50",
        softBlue : "bg-sky-50 text-sky-700 border border-sky-700 hover:bg-blue-200 hover:text-blue-900 dark:bg-blue-900 dark:text-blue-50 dark:hover:bg-blue-900/80 dark:hover:text-blue-50",
        disable : "bg-zinc-400 text-white border border-zinc-400 hover:bg-zinc-400/80 hover:text-white dark:bg-zinc-400 dark:text-white dark:hover:bg-zinc-400/80 dark:hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2 rounded",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
