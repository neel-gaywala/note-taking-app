"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import CreateNote from "@/features/note/containers/create-note";
import { NAVBAR_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";

type NavbarProps = object;

function Navbar({}: NavbarProps) {
  const pathname = usePathname();

  const isActiveLink = (href: string, pathname: string | null) => {
    if (href === "/") {
      return pathname === "/" || pathname?.startsWith("/note");
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="relative flex space-y-1 sm:space-y-0 flex-col sm:flex-row h-fit py-3 sm:py-0 sm:h-16 w-full sm:items-center sm:justify-between px-3 shadow-sm sm:space-x-24 sm:px-5">
      <div className="flex">
        <div className="flex justify-center gap-2">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center justify-center gap-2"
          >
            <div className="space-y-0">
              <h5 className="text-xl font-bold">{"My Note"}</h5>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex justify-between sm:justify-center items-end sm:items-center sm:space-x-12">
        <ul className="flex items-center space-x-6 ">
          {NAVBAR_LIST.map(({ id, name, href }) => (
            <li key={id} className="inline-block">
              <Link
                href={href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  isActiveLink(href, pathname)
                    ? "font-medium text-foreground"
                    : "text-foreground/80"
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex space-x-2">
          <CreateNote />
        </div>
      </div>
    </div>
  );
}

export { Navbar };
