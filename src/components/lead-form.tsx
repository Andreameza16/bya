"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowUpRight, Check, MessageCircle, ArrowLeft } from "lucide-react";
import { courses } from "@/data/courses";
import { business } from "@/data/business";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  readLocal,
  storageKeys,
  writeLocal,
  type Lead,
  type SeminarInterest,
} from "@/lib/local-store";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (value) => /^(?:505)?[2-8]\d{7}$/.test(value.replace(/\D/g, "")),
    "Ingresá 8 dígitos o +505 seguido de 8 dígitos.",
  );
const base = {
  name: z.string().trim().min(3, "Escribí tu nombre completo.").max(100),
  phone: phoneSchema,
  city: z.string().trim().min(2, "Indicá tu ciudad.").max(80),
  consent: z
    .boolean()
    .refine(
      (value) => value,
      "Necesitamos tu consentimiento para contactarte.",
    ),
};
const leadSchema = z.object({
  ...base,
  course: z
    .string()
    .refine(
      (value) => courses.some((course) => course.slug === value),
      "Elegí un programa.",
    ),
  level: z.enum(
    ["Estoy comenzando", "Tengo experiencia", "Trabajo profesionalmente"],
    { error: "Elegí tu nivel actual." },
  ),
  schedule: z.enum(["Mañana", "Tarde", "Fin de semana"], {
    error: "Elegí una preferencia.",
  }),
  studyCity: z.string().min(2, "Elegí una ciudad."),
});
const interestSchema = z.object({
  ...base,
  topic: z
    .string()
    .refine(
      (value) =>
        courses.some(
          (course) => course.slug === value && course.type === "Seminario",
        ),
      "Elegí un seminario.",
    ),
});
type LeadValues = z.infer<typeof leadSchema>;
type InterestValues = z.infer<typeof interestSchema>;

function ErrorText({ message, id }: { message?: string; id: string }) {
  return message ? (
    <span id={id} className="field-error" role="alert">
      {message}
    </span>
  ) : null;
}

export function LeadForm({
  courseSlug = "",
  compact = false,
}: {
  courseSlug?: string;
  compact?: boolean;
}) {
  const [summary, setSummary] = useState<LeadValues | null>(null);
  const [storageError, setStorageError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      course: courseSlug,
      city: "",
      studyCity: "Masaya",
      consent: false,
    },
  });
  const submit = (values: LeadValues) => {
    const previous = readLocal<Lead[]>(storageKeys.leads, []);
    const saved = writeLocal(storageKeys.leads, [
      ...previous,
      {
        ...values,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: "Nuevo",
      },
    ]);
    setStorageError(
      saved
        ? ""
        : "Tu navegador no permitió guardar la solicitud. Podés enviar el resumen por WhatsApp.",
    );
    setSummary(values);
  };
  if (summary) {
    const course = courses.find((item) => item.slug === summary.course)!;
    const message = `Hola, soy ${summary.name}.\nMe interesa ${course.name}.\nMi WhatsApp: ${summary.phone}.\nVivo en ${summary.city}.\nNivel: ${summary.level}.\nPrefiero: ${summary.schedule}.\nQuisiera estudiar en ${summary.studyCity}.\nAutorizo que me contacten para recibir información. ¿Podrían confirmar fechas, horarios y precio?`;
    return (
      <div className="form-summary" role="status">
        <span className="success-mark">
          <Check aria-hidden="true" />
        </span>
        <span className="eyebrow">TU SOLICITUD ESTÁ LISTA</span>
        <h3>Un paso más, {summary.name.split(" ")[0]}.</h3>
        <p>
          Revisá el resumen y envialo a la academia por WhatsApp para continuar.
        </p>
        <dl>
          {[
            ["Programa", course.shortName],
            ["Tu ciudad", summary.city],
            ["WhatsApp", summary.phone],
            ["Nivel", summary.level],
            ["Preferencia", summary.schedule],
            ["Ciudad de estudio", summary.studyCity],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {storageError && <p className="field-error">{storageError}</p>}
        <a
          className="button button-primary"
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar por WhatsApp
          <MessageCircle size={18} aria-hidden="true" />
        </a>
        <button
          type="button"
          className="text-link"
          onClick={() => setSummary(null)}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Editar mis datos
        </button>
        <small>
          La demo guarda una copia en este navegador. La academia recibe el
          mensaje cuando lo enviás en WhatsApp.
        </small>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`lead-form ${compact ? "compact" : ""}`}
      noValidate
    >
      <div className="form-heading">
        <span className="eyebrow">HABLEMOS DE TU PRÓXIMO PASO</span>
        <h3>Quiero información.</h3>
        <p>
          Contanos un poco sobre vos. Prepararemos tu consulta para la academia.
        </p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="lead-name">
            Nombre completo <span>*</span>
          </label>
          <input
            id="lead-name"
            autoComplete="name"
            placeholder="¿Cómo te llamás?"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby="lead-name-error"
            {...register("name")}
          />
          <ErrorText id="lead-name-error" message={errors.name?.message} />
        </div>
        <div className="field">
          <label htmlFor="lead-phone">
            WhatsApp <span>*</span>
          </label>
          <input
            id="lead-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+505 0000 0000"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby="lead-phone-error"
            {...register("phone")}
          />
          <ErrorText id="lead-phone-error" message={errors.phone?.message} />
        </div>
        <div className="field">
          <label htmlFor="lead-city">
            Ciudad donde vivís <span>*</span>
          </label>
          <input
            id="lead-city"
            autoComplete="address-level2"
            placeholder="Tu ciudad"
            aria-required="true"
            aria-invalid={!!errors.city}
            aria-describedby="lead-city-error"
            {...register("city")}
          />
          <ErrorText id="lead-city-error" message={errors.city?.message} />
        </div>
        <div className="field">
          <label htmlFor="lead-course">
            Programa de interés <span>*</span>
          </label>
          <select
            id="lead-course"
            aria-required="true"
            aria-invalid={!!errors.course}
            aria-describedby="lead-course-error"
            {...register("course")}
          >
            <option value="">Elegí un programa</option>
            {courses.map((course) => (
              <option key={course.slug} value={course.slug}>
                {course.shortName}
              </option>
            ))}
          </select>
          <ErrorText id="lead-course-error" message={errors.course?.message} />
        </div>
        <div className="field">
          <label htmlFor="lead-level">
            Tu nivel actual <span>*</span>
          </label>
          <select
            id="lead-level"
            aria-required="true"
            aria-invalid={!!errors.level}
            aria-describedby="lead-level-error"
            {...register("level")}
          >
            <option value="">Elegí tu nivel</option>
            {[
              "Estoy comenzando",
              "Tengo experiencia",
              "Trabajo profesionalmente",
            ].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <ErrorText id="lead-level-error" message={errors.level?.message} />
        </div>
        <div className="field">
          <label htmlFor="lead-schedule">
            Horario que preferís <span>*</span>
          </label>
          <select
            id="lead-schedule"
            aria-required="true"
            aria-invalid={!!errors.schedule}
            aria-describedby="lead-schedule-error"
            {...register("schedule")}
          >
            <option value="">Elegí una preferencia</option>
            {["Mañana", "Tarde", "Fin de semana"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <ErrorText
            id="lead-schedule-error"
            message={errors.schedule?.message}
          />
        </div>
        <div className="field full-width">
          <label htmlFor="lead-study-city">
            Ciudad donde te gustaría estudiar <span>*</span>
          </label>
          <select
            id="lead-study-city"
            aria-required="true"
            aria-invalid={!!errors.studyCity}
            aria-describedby="lead-study-city-error"
            {...register("studyCity")}
          >
            {business.cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
          <ErrorText
            id="lead-study-city-error"
            message={errors.studyCity?.message}
          />
          <small>
            Es una preferencia. La disponibilidad y los horarios se confirman
            con la academia.
          </small>
        </div>
      </div>
      <label className="checkbox-field">
        <input
          type="checkbox"
          aria-required="true"
          aria-invalid={!!errors.consent}
          aria-describedby="lead-consent-error"
          {...register("consent")}
        />
        <span>
          Autorizo que me contacten sobre esta formación. Leí la{" "}
          <Link href="/privacidad">información de privacidad</Link>.
        </span>
      </label>
      <ErrorText id="lead-consent-error" message={errors.consent?.message} />
      <button
        type="submit"
        className="button button-primary"
        disabled={isSubmitting}
      >
        Preparar mi solicitud
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        Sin compromiso de matrícula. Tus datos se guardan únicamente en este
        navegador hasta que enviás el mensaje por WhatsApp.
      </p>
    </form>
  );
}
export function CourseInterestForm({ courseSlug }: { courseSlug: string }) {
  return <LeadForm courseSlug={courseSlug} compact />;
}

export function SeminarAlertForm() {
  const [summary, setSummary] = useState<InterestValues | null>(null);
  const [storageError, setStorageError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterestValues>({
    resolver: zodResolver(interestSchema),
    defaultValues: { consent: false },
  });
  if (summary)
    return (
      <div className="form-summary">
        <span className="success-mark">
          <Check aria-hidden="true" />
        </span>
        <h3>Tu interés está anotado.</h3>
        <p>
          {storageError ||
            "Guardamos tu solicitud en este navegador. Enviá el mensaje a la academia para que pueda avisarte."}
        </p>
        <a
          className="button button-primary"
          href={whatsappUrl(
            `Hola, soy ${summary.name}. Mi WhatsApp es ${summary.phone}, vivo en ${summary.city} y quisiera que me avisen sobre ${courses.find((c) => c.slug === summary.topic)?.name}. Autorizo que me contacten.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar por WhatsApp
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <button
          className="text-link"
          type="button"
          onClick={() => setSummary(null)}
        >
          Editar solicitud
        </button>
      </div>
    );
  return (
    <form
      className="lead-form"
      noValidate
      onSubmit={handleSubmit((values) => {
        const saved = writeLocal(storageKeys.notifications, [
          ...readLocal<SeminarInterest[]>(storageKeys.notifications, []),
          {
            ...values,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          },
        ]);
        setStorageError(
          saved
            ? ""
            : "No se pudo guardar en este navegador. Enviá el mensaje para comunicar tu interés.",
        );
        setSummary(values);
      })}
    >
      <div className="form-heading">
        <span className="eyebrow">ENTERATE DE LA PRÓXIMA CONVOCATORIA</span>
        <h3>Quiero que me avisen.</h3>
        <p>Elegí un tema y prepará tu consulta.</p>
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="alert-name">Nombre completo *</label>
          <input
            id="alert-name"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby="alert-name-error"
            {...register("name")}
          />
          <ErrorText id="alert-name-error" message={errors.name?.message} />
        </div>
        <div className="field">
          <label htmlFor="alert-phone">WhatsApp *</label>
          <input
            id="alert-phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby="alert-phone-error"
            {...register("phone")}
          />
          <ErrorText id="alert-phone-error" message={errors.phone?.message} />
        </div>
        <div className="field">
          <label htmlFor="alert-city">Tu ciudad *</label>
          <input
            id="alert-city"
            autoComplete="address-level2"
            aria-required="true"
            aria-invalid={!!errors.city}
            aria-describedby="alert-city-error"
            {...register("city")}
          />
          <ErrorText id="alert-city-error" message={errors.city?.message} />
        </div>
        <div className="field">
          <label htmlFor="alert-topic">Tema de interés *</label>
          <select
            id="alert-topic"
            aria-required="true"
            aria-invalid={!!errors.topic}
            aria-describedby="alert-topic-error"
            {...register("topic")}
          >
            <option value="">Elegí un tema</option>
            {courses
              .filter((c) => c.type === "Seminario")
              .map((c) => (
                <option value={c.slug} key={c.slug}>
                  {c.shortName}
                </option>
              ))}
          </select>
          <ErrorText id="alert-topic-error" message={errors.topic?.message} />
        </div>
      </div>
      <label className="checkbox-field">
        <input
          type="checkbox"
          aria-required="true"
          aria-invalid={!!errors.consent}
          aria-describedby="alert-consent-error"
          {...register("consent")}
        />
        <span>
          Autorizo el contacto sobre seminarios y leí la{" "}
          <Link href="/privacidad">información de privacidad</Link>.
        </span>
      </label>
      <ErrorText id="alert-consent-error" message={errors.consent?.message} />
      <button className="button button-primary" type="submit">
        Preparar solicitud
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      <p className="form-note">
        La demo guarda el interés en este navegador. Enviá el mensaje por
        WhatsApp para comunicarlo al negocio.
      </p>
    </form>
  );
}
