"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Strona Główna", href: "/#home" },
  { label: "Dla Firm", href: "/#dla-firm" },
  { label: "Dla Klientów", href: "/#dla-klientow" },
  { label: "Usługi", href: "/#uslugi" },
  { label: "Abonamenty", href: "/#abonamenty" },
  { label: "Kontakt", href: "/#kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <Link href="/#home" className="flex items-center">
          <span className="font-heading text-2xl font-extrabold sm:text-3xl">
            <span className="text-navy">DDD</span>
            <span className="text-green">off</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-sans text-sm font-medium text-text transition-colors hover:text-navy"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-green px-6 font-sans font-semibold text-white shadow-md hover:bg-green-dark"
          >
            <Link href="/#kontakt">
              <Phone className="size-4" />
              Bezpłatna Wycena
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Otwórz menu">
                <Menu className="size-6 text-navy" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-80">
              <SheetHeader>
                <SheetTitle>
                  <span className="font-heading text-2xl font-extrabold">
                    <span className="text-navy">DDD</span>
                    <span className="text-green">off</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-6 flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="group relative rounded-lg px-4 py-3 font-sans text-base font-medium text-text transition-colors hover:bg-slate-light hover:text-navy"
                    >
                      {link.label}
                      <span className="absolute bottom-2 left-4 h-0.5 w-0 bg-green transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-8 px-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-full bg-green px-6 py-3 font-sans font-semibold text-white shadow-md hover:bg-green-dark"
                    size="lg"
                  >
                    <Link href="/#kontakt">
                      <Phone className="size-4" />
                      Bezpłatna Wycena
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
