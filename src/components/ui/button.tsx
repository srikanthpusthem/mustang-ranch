import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-small font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white shadow-card hover:bg-accent/90 hover:shadow-card-hover",
        secondary:
          "bg-surface-alt text-text border border-border shadow-card hover:bg-surface-alt/80 hover:shadow-card-hover",
        ghost:
          "text-text hover:bg-surface-alt hover:text-text",
        link: "text-accent underline-offset-4 hover:underline",
        destructive:
          "bg-red-600 text-white shadow-card hover:bg-red-700 hover:shadow-card-hover",
      },
      size: {
        sm: "h-8 px-3 text-small gap-1.5",
        md: "h-10 px-4 text-small gap-2",
        lg: "h-12 px-6 text-body gap-2",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
