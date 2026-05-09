import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    // Simplified variant and size classes (mimicking cva)
    const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    let variantClass = "";
    if (variant === "default") variantClass = "bg-primary text-primary-foreground hover:bg-primary/90";
    if (variant === "destructive") variantClass = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    if (variant === "outline") variantClass = "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
    if (variant === "secondary") variantClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    if (variant === "ghost") variantClass = "hover:bg-accent hover:text-accent-foreground";
    if (variant === "link") variantClass = "text-primary underline-offset-4 hover:underline";

    let sizeClass = "";
    if (size === "default") sizeClass = "h-10 px-4 py-2";
    if (size === "sm") sizeClass = "h-9 rounded-md px-3";
    if (size === "lg") sizeClass = "h-11 rounded-md px-8";
    if (size === "icon") sizeClass = "h-10 w-10";

    const finalClassName = cn(baseClass, variantClass, sizeClass, className);

    // If asChild is used (we can't easily do Slot without the library), 
    // we'll just throw a warning and render a regular button, but for our Navbar, we are using asChild with Link.
    // Actually, if asChild is true, we should ideally render the child.
    if (asChild) {
      // Very basic implementation of asChild
      const child = React.Children.only(props.children) as React.ReactElement;
      const { children, ...restProps } = props;
      return React.cloneElement(child, {
        className: cn(finalClassName, child.props.className),
        ...restProps,
      });
    }

    return (
      <button
        className={finalClassName}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button }
