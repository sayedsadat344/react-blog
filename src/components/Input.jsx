import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", classes = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      {/* ✅ THIS MUST BE lowercase input */}
      <input
        type={type}
        className={`w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${classes}`}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
