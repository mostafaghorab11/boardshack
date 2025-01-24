import clsx from "clsx";
import type { ComponentPropsWithRef, ElementType } from "react";

type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & ComponentPropsWithRef<T>;

export function Bounded<T extends ElementType = "section">({
  as,
  className,
  children,
  ...restProps
}: BoundedProps<T>) {
  const Comp = as || "section";
  return (
    <Comp
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className,
      )}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
