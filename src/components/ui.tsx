import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Star,
  MessageCircle,
  MapPin,
  UserRound,
  Plus,
} from "lucide-react";
import { business } from "@/data/business";
import { whatsappUrl } from "@/lib/whatsapp";
import type { ReactNode } from "react";

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "light";
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      className={`button button-${variant} ${className}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function WhatsAppButton({
  message,
  children = "Hablar por WhatsApp",
  variant = "secondary",
  className = "",
}: {
  message: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "light";
  className?: string;
}) {
  return (
    <Button
      href={whatsappUrl(message)}
      external
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
export function SectionHeader({
  eyebrow,
  title,
  description,
  children,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children && <div className="section-heading-action">{children}</div>}
    </div>
  );
}
export function RatingBadge({ full = false }: { full?: boolean }) {
  return (
    <a
      className={`rating-badge ${full ? "full" : ""}`}
      href={business.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="google-letter" aria-hidden="true">
        G
      </span>
      <div>
        <span className="rating-number">
          {business.googleRating}{" "}
          <Star size={13} fill="currentColor" aria-hidden="true" /> en Google
        </span>
        <small>{business.googleReviews} reseñas · valoración observada</small>
      </div>
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
export function CityChip({
  city,
  active = false,
}: {
  city: string;
  active?: boolean;
}) {
  return (
    <span className={`city-chip ${active ? "active" : ""}`}>
      <MapPin size={13} aria-hidden="true" />
      {city}
    </span>
  );
}
export function InstructorCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="instructor-card">
      <span className="avatar">
        <UserRound size={24} aria-hidden="true" />
      </span>
      <div>
        <h3>{name}</h3>
        <p>{role}</p>
        <small>Participación en próxima convocatoria por confirmar.</small>
      </div>
    </div>
  );
}
export function ImagePlaceholder({
  src,
  label,
  className = "",
  priority = false,
}: {
  src: string;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`art-placeholder ${className}`}>
      <Image
        src={src}
        alt={`Composición ilustrada de ${label.toLowerCase()}; imagen conceptual de la demo`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <figcaption>Imagen conceptual · {label}</figcaption>
    </figure>
  );
}
export function Gallery({
  items,
  title = "Un espacio para los resultados.",
}: {
  items: { src: string; label: string }[];
  title?: string;
}) {
  return (
    <div className="gallery">
      <div className="gallery-heading">
        <h3>{title}</h3>
        <p>
          Las fotografías del negocio se incorporarán aquí. Estas composiciones
          muestran la dirección visual.
        </p>
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <ImagePlaceholder key={item.src} {...item} />
        ))}
      </div>
    </div>
  );
}
export function WhatsAppCTA() {
  return (
    <a
      className="whatsapp-floating"
      href={whatsappUrl(
        "Hola, quisiera orientación para elegir un curso o consultar un servicio en Belleza y Armonía.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversemos: consultar a Belleza y Armonía por WhatsApp"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span>Conversemos</span>
    </a>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <span className="eyebrow">EL SIGUIENTE CAPÍTULO ES TUYO</span>
        <h2>
          Tu próximo paso
          <br />
          puede comenzar <em>hoy.</em>
        </h2>
        <div className="button-row">
          <Button href="/academia">Ver cursos</Button>
          <WhatsAppButton
            message="Hola, quisiera orientación sobre la academia Belleza y Armonía."
            variant="light"
          />
        </div>
        <Plus
          className="cta-decoration"
          size={90}
          strokeWidth={0.6}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
