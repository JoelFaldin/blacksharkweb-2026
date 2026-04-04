"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";

import type { User as UserType } from "@/types";
import { User } from "../icons";

type MenuButtonType = {
  navLinks: {
    href: string;
    label: string;
  }[];
  pathname: string;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  user: UserType | null;
  handleLogout: () => void;
};

const MenuButton = ({ navLinks, pathname, setMenuOpen, user, handleLogout }: MenuButtonType) => {
  const matchesPathname = (path: string): string => {
    return path === pathname ? "text-foreground" : "text-muted-foreground";
  };

  return (
    <div className="md:hidden fixed inset-0 top-24 z-40 bg-background border-t border-t-border flex flex-col px-6 py-8 gap-y-6">
      <nav>
        <ul className="flex flex-col gap-y-4 font-semibold text-lg text-muted-foreground">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${matchesPathname(href)} hover:text-primary transition-colors block py-1`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <hr className="border-border" />

      <div className="flex flex-col gap-y-3">
        {user?.email || user?.username ? (
          <>
            <span className="px-3 py-1 rounded bg-secondary text-sm w-fit">{user.username}</span>
            <button
              type="button"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-3 py-2 rounded hover:bg-secondary transition-colors text-sm text-foreground font-semibold text-left cursor-pointer w-fit"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-x-2 px-3 py-2 rounded hover:bg-secondary transition-colors text-sm text-foreground font-semibold w-fit"
            onClick={() => setMenuOpen(false)}
          >
            <User />
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default MenuButton;
