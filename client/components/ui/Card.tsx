import React from "react";
import clsx from "clsx";

type CardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const Card = ({
  title,
  description,
  icon,
  children,
  className,
}: CardProps) => {
  return (
    <div
      className={clsx(
        "bg-surface rounded-2xl border border-border shadow-sm p-6",
        "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
        className
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      )}

      <h3 className="mb-2 text-xl font-bold text-foreground">
        {title}
      </h3>

      <p className="text-muted leading-relaxed">
        {description}
      </p>

      {children && (
        <div className="mt-5">
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;