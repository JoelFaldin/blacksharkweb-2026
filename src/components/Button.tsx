import Link from "next/link";
import { ReactNode } from "react"

interface ButtonInterface {
  type: "primary" | "secondary",
  href: string,
  className?: string,
  children: ReactNode,
}

const Button = ({ type, href, className, children }: ButtonInterface) => {
  const styles = type === "primary" ? "bg-(--primary)" : "bg-transparent hover:bg-(--) border border-(--border)";

  return (
    <span className={`${styles}`}>
      <Link href={href} className={`${className}`}>
        {children}
      </Link>
    </span>
  )
}

export default Button