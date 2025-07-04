import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  colorClass?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className = '', colorClass = '', ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold font-sans ${colorClass} ${className}`}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
