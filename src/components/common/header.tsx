"use client";

import IconGithub from "@/components/icon/github";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Post" },
];

export const ThemeHeader = () => {
  const pathname = usePathname();

  return (
    <header className='fixed inset-x-0 top-0 z-30 px-4 py-3'>
      <div className='surface-shine reveal-up mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-neutral-200/80 bg-white/85 px-4 shadow-[0_16px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/80'>
        <nav aria-label='Primary' className='flex items-center gap-1'>
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium text-neutral-500 transition duration-300 ease-out hover:text-neutral-950 active:scale-[0.98] dark:text-neutral-400 dark:hover:text-white",
                  isActive &&
                    "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='flex items-center gap-2'>
          <Link
            href='mailto:teta1dev@gmail.com'
            className='hidden rounded-full border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition duration-300 ease-out hover:border-neutral-950 hover:text-neutral-950 active:scale-[0.98] dark:border-white/10 dark:text-neutral-300 dark:hover:border-white dark:hover:text-white sm:inline-flex'
          >
            Email
          </Link>

          <Link
            href='https://github.com/ichbinmin2'
            aria-label='GitHub'
            className='inline-flex size-9 items-center justify-center rounded-full border border-neutral-200 transition duration-300 ease-out hover:border-neutral-950 active:scale-[0.98] dark:border-white/10 dark:hover:border-white'
          >
            <IconGithub />
          </Link>
        </div>
      </div>
    </header>
  );
};
