import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonInterface {
  type: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const Button = ({ type, href, onClick, className, children }: ButtonInterface) => {
  const styles =
    type === "primary" ? "bg-primary" : "bg-transparent hover:bg-(--) border border-border";

  if (href) {
    return (
      <span className={`${styles}`}>
        <Link href={href} className={`${className}`}>
          {children}
        </Link>
      </span>
    );
  } else if (onClick) {
    return (
      <span className={`${styles}`}>
        <button type="button" onClick={onClick} className={`${className}`}>
          {children}
        </button>
      </span>
    );
  }
};

export default Button;
