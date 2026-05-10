"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: 'Studio', href: '#who' },
  { name: 'Services', href: '#services' },
  { name: 'Playground', href: '#portfolio' },
  { name: 'Process', href: '#process' },
];

const Logo = ({ className }: { className?: string }) => {
  return (
    <div 
      className={cn("text-xl tracking-tight text-white flex items-center", className)} 
      style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700 }}
    >
      <img 
        src="/logo.svg" 
        alt="Launchpad Logo" 
        className="h-8 w-auto mr-2.5"
      />
      Launch<span className="gradient-text">pad</span>
    </div>
  );
};

export default function Navbar() {
  const [menuState, setMenuState] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      data-state={menuState ? "active" : "inactive"}
      className="fixed z-50 w-full px-2 group top-0"
    >
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 border border-transparent rounded-[32px] lg:px-12",
          isScrolled && "bg-background/50 max-w-4xl border-white/5 backdrop-blur-lg lg:px-5"
        )}
      >
        <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
          <div className="flex w-full justify-between lg:w-auto">
            <a 
              href="#" 
              aria-label="home" 
              className="flex items-center space-x-2"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Logo />
            </a>

            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
            >
              <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
              <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
            </button>
          </div>

          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <ul className="flex gap-8 text-sm">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-accent-foreground block duration-150"
                  >
                    <span style={{ color: "var(--text-soft)" }}>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
            <div className="lg:hidden">
              <ul className="space-y-6 text-base">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span style={{ color: "var(--text-soft)" }}>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
              <Button
                asChild
                size="sm"
                className={cn("button-primary", isScrolled ? "lg:inline-flex" : "")}
                style={{ borderRadius: "999px" }}
              >
                <Link href="#contact">
                  <span>Get Started</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
