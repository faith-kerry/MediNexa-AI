import React from "react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
};

const Input = ({
  label,
  placeholder,
  type = "text",
  error,
  disabled = false,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "w-full rounded-xl border border-border px-4 py-3 outline-none transition-all duration-200",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          disabled && "cursor-not-allowed opacity-50"
        )}
      />

      {error && (
        <span className="text-sm text-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;