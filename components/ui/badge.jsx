import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        verified: "rounded-[3px] bg-greenStatus/80 border border-greenStatus w-[80px] justify-center text-white  tracking-wide ",
        unverified: "rounded-[3px] bg-yellowStatus/80 border border-yellowStatus w-[80px] justify-center text-white  tracking-wide",
        active: "rounded-[3px] bg-green-600/80 border border-greenStatus w-[80px] justify-center text-white tracking-wide",
        redStatus: "rounded-[3px] bg-red-600/80 border border-red-600 w-[80px] justify-center text-white tracking-wide",
        grayStatus: "rounded-[3px] bg-gray-600/80 border border-gray-600 w-[80px] justify-center text-white tracking-wide",
        lightGray: "rounded-[3px] bg-gray-500/50 border border-gray-500 w-[80px] justify-center text-white tracking-wide",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }
