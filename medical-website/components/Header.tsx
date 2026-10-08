"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { clinic, nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}${open ? " header--open" : ""}`}>
      <div className="header__inner">
        <Logo />
        <nav className="header__nav" aria-label="Əsas menyu">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <a className="header__phone" href={clinic.phoneHref}>
            <Phone size={16} aria-hidden="true" />
            {clinic.phone}
          </a>
          <a className="btn btn--primary btn--sm" href="#qebul">
            Qəbula yazıl
          </a>
          <button
            type="button"
            className="header__toggle"
            aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
