import { CourseCatalog } from "@/components/catalog";
import { WhatsAppButton, FinalCTA } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Academia de Belleza y Barbería en Masaya",
  "Explorá los cursos de barbería, uñas y seminarios de cabello de Belleza y Armonía. Conocé cada programa y consultá su próxima convocatoria en Nicaragua.",
  "/academia",
);
export default function AcademiaPage() {
  return (
    <>
      <section className="page-intro container">
        <span className="eyebrow">ACADEMIA · TU PRÓXIMO CAPÍTULO</span>
        <h1>
          Un talento.
          <br />
          <em>Muchas posibilidades.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            Encontrá la formación que conecta con lo que te gusta hacer.
            Explorá, compará y elegí tu siguiente paso.
          </p>
          <span>BARBERÍA / UÑAS / CABELLO</span>
        </div>
      </section>
      <section className="container catalog-section">
        <CourseCatalog />
        <div className="advice-banner">
          <div>
            <span className="eyebrow">TE ACOMPAÑAMOS A ELEGIR</span>
            <h2>¿No sabés qué formación elegir?</h2>
            <p>
              Contanos tus intereses y tu experiencia. Empecemos por una
              conversación.
            </p>
          </div>
          <WhatsAppButton
            message="Hola, quisiera orientación para elegir una formación en Belleza y Armonía."
            variant="dark"
          >
            Hablar con la academia
          </WhatsAppButton>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
