"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import { Box, Button } from "@radix-ui/themes";

const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  const currentPath = usePathname();

  const { status, data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug className=" text-sky-900 hover:text-sky-400 transition-colors size-10" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-900 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {status === "authenticated" && (
          <Link href="api/auth/signout">Logout</Link>
        )}

        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </ul>
      <Box></Box>
    </nav>
  );
};

export default NavBar;
