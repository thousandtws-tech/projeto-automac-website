import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-brand-red-500 text-white hover:bg-brand-red-600",
        outline:
          "border-black bg-white text-black hover:bg-neutral-50",
        secondary:
          "bg-black text-white hover:bg-neutral-800",
        ghost:
          "hover:bg-neutral-100 text-black",
        destructive:
          "bg-brand-red-500 text-white hover:bg-brand-red-600",
        link: "text-black underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 text-xs uppercase tracking-widest",
        xs: "h-7 gap-1 px-2.5 text-[10px] uppercase tracking-widest",
        sm: "h-8 gap-1 px-3 text-[10px] uppercase tracking-widest",
        lg: "h-11 gap-1.5 px-6 text-xs uppercase tracking-widest",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
