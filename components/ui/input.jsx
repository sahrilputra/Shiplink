import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const InputVariant = cva(
  "flex w-full rounded-md border border-slate-300 bg-white px-3 py-1 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2 rounded text-xs",
        sm: "h-8 rounded-sm text-xs px-3",
        xs: "h-[30px] rounded px-2 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-md",
        tableIcon: "h-8 w-8 rounded-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Input =React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) =>{
  return (
    (<input
      className={cn(InputVariant({ size, className }))}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

