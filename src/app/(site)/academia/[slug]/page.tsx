import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  MapPin,
  Clock3,
  CalendarDays,
  GraduationCap,
} from "lucide-react";
import { courses } from "@/data/courses";
import { instructors } from "@/data/instructors";
import {
  Button,
  Gallery,
  ImagePlaceholder,
  InstructorCard,
  WhatsAppButton,
} from "@/components/ui";
import { CourseInterestForm } from "@/components/lead-form";
import { courseMessage, whatsappUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) return { title: "Programa no encontrado" };
  return pageMetadata(
    `${course.shortName} · ${course.type}`,
    course.description,
    `/academia/${slug}`,
  );
}
export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();
  const instructor = instructors.find(
    (person) => person.id === course.instructorId,
  );
  const details = [
    ["Duración", course.duration || "Consultar", Clock3],
    ["Nivel", course.level || "Consultar", GraduationCap],
    ["Ciudad", course.city, MapPin],
    ["Próxima fecha", "Por confirmar", CalendarDays],
  ] as const;
  return (
    <>
      <section className="container course-detail-hero">
        <Link href="/academia" className="back-link">
          <ArrowLeft size={15} aria-hidden="true" />
          Todos los programas
        </Link>
        <div className="course-detail-grid">
          <div>
            <span className="eyebrow">
              {course.type.toUpperCase()} · {course.category.toUpperCase()}
            </span>
            <h1>{course.shortName}</h1>
            <p>{course.description}</p>
            <div className="button-row">
              <Button href="#solicitud">Quiero información</Button>
              <WhatsAppButton message={courseMessage(course.name)}>
                Consultar por WhatsApp
              </WhatsAppButton>
            </div>
            <div className="course-quick-info">
              {details.map(([label, value, Icon]) => (
                <div key={label}>
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p className="course-date-note">
              Precio por confirmar.{" "}
              {course.duration &&
                "Duración publicada: confirmá su vigencia con la academia."}
            </p>
          </div>
          <ImagePlaceholder
            src={course.image}
            label={course.shortName}
            priority
          />
        </div>
      </section>
      <section className="section container course-content-grid">
        <div>
          <span className="eyebrow">EL PROGRAMA</span>
          <h2>
            Una técnica.
            <br />
            <em>Nuevas posibilidades.</em>
          </h2>
          <h3>Qué aprenderás</h3>
          {course.topics.length ? (
            <ul className="topic-list">
              {course.topics.map((topic) => (
                <li key={topic}>
                  <Check size={16} aria-hidden="true" />
                  {topic}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              El temario detallado de esta convocatoria está por confirmar.
              Solicitá información a la academia.
            </p>
          )}
          <div className="course-for">
            <h3>¿Para quién es?</h3>
            <p>
              {course.slug === "unas-acrilicas"
                ? "Para quienes quieren comenzar o avanzar en el diseño de uñas. Según la información publicada, no se requiere experiencia previa."
                : course.slug === "barberia-profesional"
                  ? "Para personas interesadas en formación avanzada de barbería. Consultá los conocimientos previos recomendados para esta convocatoria."
                  : "Para personas interesadas en esta especialización. Consultá el nivel recomendado y los requisitos de participación."}
            </p>
          </div>
          {instructor && (
            <div className="course-instructor">
              <h3>Formación especializada</h3>
              <InstructorCard name={instructor.name} role={instructor.role} />
            </div>
          )}
          <div className="faq">
            <h3>Antes de dar el siguiente paso.</h3>
            {[
              [
                "¿Cuándo comienza?",
                "La próxima fecha está por confirmar. Escribinos para conocer la convocatoria vigente.",
              ],
              [
                "¿Cuál es la inversión?",
                "El precio actual no está confirmado. Solicitá información sobre la inversión y las formas de pago.",
              ],
              [
                "¿Incluye materiales y certificado?",
                "Consultá con la academia los materiales, condiciones y certificación específicos de este programa.",
              ],
              [
                "¿Completar el formulario reserva mi cupo?",
                "El formulario prepara una solicitud de información. La academia debe confirmar disponibilidad y condiciones para realizar una matrícula.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
        <aside id="solicitud" className="course-form-aside">
          <CourseInterestForm courseSlug={course.slug} />
        </aside>
      </section>
      <section className="container course-gallery">
        <Gallery
          items={[
            { src: course.image, label: course.shortName },
            {
              src: "/images/business/practica.svg",
              label: "Formación práctica",
            },
          ]}
        />
      </section>
      <div className="mobile-course-cta">
        <div>
          <strong>{course.shortName}</strong>
          <small>Próxima fecha por confirmar</small>
        </div>
        <a
          href={whatsappUrl(courseMessage(course.name))}
          target="_blank"
          rel="noopener noreferrer"
          className="button button-primary"
        >
          Quiero información
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
