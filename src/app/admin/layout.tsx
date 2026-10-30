import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
export const metadata: Metadata = {
  title: "Panel de demostración",
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <AdminShell>{children}</AdminShell>
    </>
  );
}
