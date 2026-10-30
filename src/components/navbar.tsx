"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
    >
      <span className="brand-monogram" aria-hidden="true">
        b<span>&</span>a
      </span>
      <span className="brand-name">
        Belleza <i>&</i> Armonía<small>SALÓN & ACADEMIA</small>
      </span>
    </Link>
  );
}
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <div className="announcement">
        <span>Formación en belleza y barbería. Un nuevo comienzo.</span>
        <span>MASAYA, NICARAGUA</span>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname.startsWith(item.href) ? "active" : ""}
                aria-current={
                  pathname.startsWith(item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/academia" className="button button-dark nav-cta">
            Ver cursos
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Navegación móvil"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={
                  pathname.startsWith(item.href) ? "page" : undefined
                }
              >
                {item.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            ))}
            <Link
              href="/academia"
              className="button button-primary"
              onClick={() => setOpen(false)}
            >
              Explorar cursos
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
