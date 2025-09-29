import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-small font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-surface-alt text-text border border-border hover:bg-accent hover:text-white hover:border-accent focus-visible:ring-accent/50",
        selected:
          "bg-accent text-white border border-accent shadow-card focus-visible:ring-accent/50",
        outline:
          "border border-border text-text hover:bg-surface-alt hover:border-accent focus-visible:ring-accent/50",
      },
      size: {
        sm: "h-7 px-3 text-small",
        md: "h-8 px-4 text-small",
        lg: "h-9 px-5 text-body",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  asChild?: boolean
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(chipVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Chip.displayName = "Chip"

export { Chip, chipVariants }
