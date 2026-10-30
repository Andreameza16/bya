import { business } from "@/data/business";
import { instructors } from "@/data/instructors";
import {
  Button,
  CityChip,
  FinalCTA,
  ImagePlaceholder,
  InstructorCard,
  SectionHeader,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Conocé Nuestra Academia y Salón en Masaya",
  "Belleza y Armonía reúne formación profesional y servicios de belleza en Masaya. Conocé su propuesta de academia, salón y seminarios en Nicaragua.",
  "/nosotros",
);
export default function AboutPage() {
  return (
    <>
      <section className="page-intro container">
        <span className="eyebrow">BELLEZA & ARMONÍA · NUESTRA ESENCIA</span>
        <h1>
          Talento que aprende.
          <br />
          <em>Belleza que conecta.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            Belleza y Armonía reúne formación profesional y servicios de belleza
            desde Masaya, Nicaragua.
          </p>
          <span>ACADEMIA + SALÓN</span>
        </div>
      </section>
      <section className="container about-grid">
        <ImagePlaceholder
          src="/images/business/practica.svg"
          label="La esencia de aprender"
        />
        <div>
          <span className="eyebrow">DOS CAMINOS. UNA MISMA ESENCIA.</span>
          <h2>
            Aprender y crear
            <br />
            <em>con intención.</em>
          </h2>
          <p>
            La academia presenta opciones de formación en belleza y barbería. El
            salón ofrece un espacio para consultar servicios de cabello, uñas y
            estética.
          </p>
          <p>
            Los seminarios especializados han sido promocionados en distintos
            puntos de Nicaragua, acercando nuevas posibilidades de formación.
          </p>
          <Button href="/academia">Conocé los programas</Button>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          eyebrow="FORMACIÓN ESPECIALIZADA"
          title={
            <>
              Personas que comparten
              <br />
              <em>su conocimiento.</em>
            </>
          }
          description="Nombres relacionados con publicaciones de formación. El equipo de la próxima convocatoria se confirma con la academia."
        />
        <div className="instructor-grid">
          {instructors.map((person) => (
            <InstructorCard
              key={person.id}
              name={person.name}
              role={person.role}
            />
          ))}
        </div>
      </section>
      <section className="section container about-cities">
        <span className="eyebrow">DESDE MASAYA, PARA NICARAGUA</span>
        <h2>
          El conocimiento
          <br />
          <em>encuentra su camino.</em>
        </h2>
        <div className="city-chips">
          {business.cities.map((city) => (
            <CityChip city={city} key={city} />
          ))}
        </div>
        <p>
          Ciudades con referencias históricas de seminarios. Consultá las
          próximas convocatorias.
        </p>
      </section>
      <FinalCTA />
    </>
  );
}
