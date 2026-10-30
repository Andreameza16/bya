import { CalendarDays, ArrowUpRight } from "lucide-react";
import { seminars } from "@/data/seminars";
import { business } from "@/data/business";
import { SeminarCard } from "@/components/course-card";
import { CityChip, SectionHeader } from "@/components/ui";
import { SeminarAlertForm } from "@/components/lead-form";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Seminarios de Belleza en Nicaragua",
  "Conocé seminarios de rizos permanentes, alisado orgánico y mechas platinadas. Consultá próximas fechas y ciudades con Belleza y Armonía, desde Masaya.",
  "/seminarios",
);
export default function SeminarsPage() {
  return (
    <>
      <section className="page-intro container">
        <span className="eyebrow">FORMACIÓN ESPECIALIZADA · NICARAGUA</span>
        <h1>
          Siempre hay algo
          <br />
          <em>nuevo por aprender.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            Técnicas, nuevas perspectivas y tu próxima especialización. Conocé
            los temas de nuestros seminarios.
          </p>
          <a href="#avisos" className="text-link">
            Quiero que me avisen
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="container seminar-catalog">
        <div className="schedule-note">
          <CalendarDays size={24} aria-hidden="true" />
          <div>
            <strong>Próximas convocatorias</strong>
            <p>
              No hay fechas publicadas en esta demo. Consultá la disponibilidad
              actual con la academia.
            </p>
          </div>
        </div>
        <div className="course-grid seminar-grid">
          {seminars.map((course, index) => (
            <SeminarCard key={course.slug} course={course} index={index} />
          ))}
        </div>
      </section>
      <section className="section container seminar-interest">
        <div>
          <SectionHeader
            eyebrow="MÁS CERCA DE TU CIUDAD"
            title={
              <>
                El siguiente encuentro
                <br />
                puede estar <em>cerca.</em>
              </>
            }
            description="La formación se ha promocionado en distintas ciudades de Nicaragua. Contanos dónde te gustaría participar."
          />
          <div className="city-chips">
            {business.cities.map((city) => (
              <CityChip key={city} city={city} />
            ))}
          </div>
          <p className="form-note">
            Ciudades con referencias históricas; las próximas sedes y fechas
            están por confirmar.
          </p>
        </div>
        <div id="avisos">
          <SeminarAlertForm />
        </div>
      </section>
    </>
  );
}
