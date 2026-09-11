import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium uppercase tracking-widest transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-foreground text-background hover:bg-neutral-200 border border-transparent shadow-sm",
      secondary:
        "bg-neutral-800 text-foreground hover:bg-neutral-700 border border-neutral-700",
      outline:
        "bg-transparent text-foreground border border-neutral-700 hover:border-foreground hover:bg-neutral-900/60",
      ghost:
        "bg-transparent text-foreground hover:bg-neutral-900 hover:text-white",
      danger:
        "bg-red-600 text-white hover:bg-red-700 border border-transparent",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 h-8",
      md: "text-xs px-5 py-2.5 h-11 font-semibold",
      lg: "text-sm px-7 py-3.5 h-13 font-semibold",
      xl: "text-base px-9 py-4 h-15 font-bold tracking-wider",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>LOADING...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
