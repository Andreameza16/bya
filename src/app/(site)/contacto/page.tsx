import { MapPin, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { business } from "@/data/business";
import { LeadForm } from "@/components/lead-form";
import { RatingBadge } from "@/components/ui";
import { whatsappUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contacto y Prematrícula de la Academia",
  "Consultá cursos, seminarios o servicios de Belleza y Armonía en Masaya. Prepará tu prematrícula y enviá tu solicitud a la academia por WhatsApp.",
  "/contacto",
);
export default function ContactPage() {
  return (
    <>
      <section className="page-intro container">
        <span className="eyebrow">HAGAMOS ESPACIO PARA TU PRÓXIMO PASO</span>
        <h1>
          Todo comienza con
          <br />
          <em>una conversación.</em>
        </h1>
      </section>
      <section className="container contact-grid">
        <div>
          <h2>
            Estamos en Masaya.
            <br />
            Conectamos con vos.
          </h2>
          <p>
            Consultá un programa, la próxima convocatoria o un servicio del
            salón. Elegí cómo te gustaría conversar.
          </p>
          <div className="contact-methods">
            <a
              href={whatsappUrl(
                "Hola, quisiera información sobre Belleza y Armonía Salón y Academia.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle aria-hidden="true" />
              <div>
                <small>WHATSAPP</small>
                <strong>{business.displayPhone}</strong>
              </div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href={`mailto:${business.email}`}>
              <Mail aria-hidden="true" />
              <div>
                <small>CORREO</small>
                <strong>{business.email}</strong>
              </div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin aria-hidden="true" />
              <div>
                <small>UBICACIÓN</small>
                <strong>Masaya, Nicaragua</strong>
                <span>Ver ubicación en Google Maps</span>
              </div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <RatingBadge full />
        </div>
        <div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}
