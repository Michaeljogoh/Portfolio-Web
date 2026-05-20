import * as React from "react";
import { SITE_CONTENT_CLASS, SITE_INSET_CLASS } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function ContainerInner({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

export function ContainerOuter({
  children,
  className,
  component: Component = "div",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  component?: React.ElementType;
}) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

type SiteWidth = "content" | "inset";

interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  component?: React.ElementType;
  wrapperClassName?: string;
  /** Applies site-wide horizontal width (px-safe inset only, no max-width cap). */
  siteWidth?: SiteWidth;
}

export function Container({
  className,
  component = "div",
  children,
  wrapperClassName,
  siteWidth,
  ...props
}: ContainerProps) {
  const siteWidthClass =
    siteWidth === "content"
      ? SITE_CONTENT_CLASS
      : siteWidth === "inset"
        ? SITE_INSET_CLASS
        : undefined;

  return (
    <ContainerOuter
      component={component}
      className={wrapperClassName}
      {...props}
    >
      <ContainerInner className={cn(siteWidthClass, className, "px-safe")}>
        {children}
      </ContainerInner>
    </ContainerOuter>
  );
}
