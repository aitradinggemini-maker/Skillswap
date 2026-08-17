import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white rounded-xl border border-slate-200/80 shadow-xs transition-all ${
          hoverable ? "hover:shadow-md hover:border-slate-300 transition-shadow" : ""
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-6 py-5 border-b border-slate-100 ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = "", children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-lg font-semibold text-slate-900 tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = "", children, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-slate-500 mt-1 ${className}`}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`px-6 py-5 ${className}`} {...props}>
    {children}
  </div>
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", children, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-6 py-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = "CardFooter";
