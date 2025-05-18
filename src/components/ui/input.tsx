import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-normal text-gray-900 shadow-sm
        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
        transition placeholder-gray-400
        font-sans
        ${className || ''}
      `}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
