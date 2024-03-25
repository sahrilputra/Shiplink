import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button";

const Pagination = ({
  className,
  ...props
}) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} />
)

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
  className,
  isActive,
  disabled,
  size = "icon",
  ...props
}) => (
  <PaginationItem>
    <a
      aria-current={isActive ? "page" : "destructive"}
      className={cn(buttonVariants({
        variant: disabled ? "disable" : "ghost",
        size,
      }), className)}
      {...props} />
  </PaginationItem>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 px-2 py-1 h-[30px]", className)}
    {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationFirst = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 px-2 py-1 h-[30px]", className)}
    {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 px-2 py-1 h-[30px]", className)}
    {...props}>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)

const PaginationLast = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to Last page"
    size="default"
    className={cn("gap-[-1] px-2 py-1 h-[30px] flex flex-row", className)}
    {...props}>
    <ChevronRight className="h-4 w-4" />
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)


const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationLast,
  PaginationFirst,
  PaginationPrevious,
}
