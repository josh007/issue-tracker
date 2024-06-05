"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug className=" text-sky-900 hover:text-sky-400 transition-colors size-10" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
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

  return (
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
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <Box className="py-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {/* <Avatar fallback="J" size="2" radius="full">
          <DropdownMenu.TriggerIcon />
        </Avatar> */}

          <Button variant="soft" size="2" radius="full">
            <Avatar fallback="J" size="2" radius="full" />
            {/* <DropdownMenu.TriggerIcon /> */}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content size="1">
          <DropdownMenu.Item shortcut="⌘ E">
            {session!.user!.email}
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link href="api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
