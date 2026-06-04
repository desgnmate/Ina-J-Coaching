import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type AsButton = CommonProps & {
  type?: "button" | "submit" | "reset";
  onClick?: ComponentProps<"button">["onClick"];
};

const baseByVariant: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export function Button(props: AsLink | AsButton) {
  const variant = props.variant ?? "primary";
  const classes = `${baseByVariant[variant]} ${props.className ?? ""}`.trim();

  if ("href" in props) {
    const isExternal =
      props.external ||
      props.href.startsWith("http") ||
      props.href.startsWith("mailto");
    if (isExternal) {
      return (
        <a
          href={props.href}
          target={props.external ? "_blank" : undefined}
          rel={props.external ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {props.children}
    </button>
  );
}
