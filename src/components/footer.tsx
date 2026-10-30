import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./navbar";
import { business } from "@/data/business";
import { navigation } from "@/data/navigation";
import { whatsappUrl } from "@/lib/whatsapp";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand light />
            <p>
              Un lugar donde el talento
              <br />
              encuentra nuevas posibilidades.
            </p>
            <span className="footer-location">
              {business.city}, {business.country}
            </span>
          </div>
          <div className="footer-links">
            <span className="eyebrow">EXPLORÁ</span>
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="footer-contact">
            <span className="eyebrow">CONVERSEMOS</span>
            <a
              href={whatsappUrl(
                "Hola, quisiera información de Belleza y Armonía.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {business.displayPhone}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver ubicación
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Belleza y Armonía.</span>
          <div>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/admin">
              Acceso a la demo del panel
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
