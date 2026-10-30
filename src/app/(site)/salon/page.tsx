import { SalonExplorer } from "@/components/salon";
import { FinalCTA, Gallery } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Salón de Belleza en Masaya, Nicaragua",
  "Conocé el salón Belleza y Armonía en Masaya. Explorá las categorías de cabello, uñas y estética y consultá los servicios y la disponibilidad por WhatsApp.",
  "/salon",
);
export default function SalonPage() {
  return (
    <>
      <section className="salon-page-intro">
        <div className="container">
          <span className="eyebrow">BELLEZA & ARMONÍA · SALÓN</span>
          <h1>
            El arte de
            <br />
            <em>sentirte vos.</em>
          </h1>
          <p>
            Una conversación, una idea, un cambio. Contanos qué buscás y
            consultá cómo podemos acompañarte.
          </p>
        </div>
      </section>
      <section className="section container">
        <SalonExplorer />
      </section>
      <section className="section container">
        <Gallery
          title="Cada resultado merece su espacio."
          items={[
            { src: "/images/courses/rizos.svg", label: "Cabello y textura" },
            { src: "/images/courses/unas.svg", label: "Diseño de uñas" },
            { src: "/images/courses/mechas.svg", label: "Color" },
          ]}
        />
      </section>
      <FinalCTA />
    </>
  );
}
