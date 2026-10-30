"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Scissors,
  UsersRound,
  Images,
  Settings,
  ArrowUpRight,
} from "lucide-react";
import { adminNavigation } from "@/data/navigation";
import { Brand } from "./navbar";
const icons = {
  dashboard: LayoutDashboard,
  courses: BookOpen,
  calendar: CalendarDays,
  services: Scissors,
  leads: UsersRound,
  posts: Images,
  settings: Settings,
};
export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Brand light />
        <span className="admin-panel-label">TU ESPACIO DE TRABAJO</span>
        <nav className="admin-nav" aria-label="Navegación del panel">
          {adminNavigation.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const active =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/">
            Ver la web
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <p>
            Panel de demostración.
            <br />
            Datos guardados en este navegador.
          </p>
        </div>
      </aside>
      <div className="admin-body">
        <header className="admin-topbar">
          <span>BELLEZA & ARMONÍA / PANEL DEMO</span>
          <div className="admin-user">
            <span>BA</span>Academia y salón
          </div>
        </header>
        <main id="contenido" className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
