"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardList,
  Download,
  Images,
  Info,
  MessageCircle,
  Save,
  Trash2,
  UsersRound,
} from "lucide-react";
import { courses, type Course } from "@/data/courses";
import { services } from "@/data/services";
import { business } from "@/data/business";
import { Button, ImagePlaceholder } from "./ui";
import {
  storageKeys,
  useLocalStore,
  type CourseOverride,
  type Lead,
  type SeminarInterest,
  type StudioSettings,
} from "@/lib/local-store";
import { whatsappUrl } from "@/lib/whatsapp";
const emptyLeads: Lead[] = [];
const emptyInterests: SeminarInterest[] = [];
const defaultSettings: StudioSettings = {
  whatsapp: business.displayPhone,
  defaultCity: business.city,
};

export function AdminHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="admin-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
export function DemoNote({ children }: { children?: React.ReactNode }) {
  return (
    <div className="admin-demo-note">
      <Info size={16} aria-hidden="true" />
      <span>
        {children ||
          "Demo local: las solicitudes y borradores se guardan en este navegador. No hay una base de datos remota ni autenticación."}
      </span>
    </div>
  );
}
export function Dashboard() {
  const [leads] = useLocalStore(storageKeys.leads, emptyLeads);
  const [interests] = useLocalStore(storageKeys.notifications, emptyInterests);
  const [drafts] = useLocalStore<{ id: string }[]>(storageKeys.drafts, []);
  const stats = [
    {
      title: "Programas",
      value: courses.length,
      note: "Cursos y seminarios del catálogo",
      Icon: BookOpen,
    },
    {
      title: "Prematrículas",
      value: leads.length,
      note: "Solicitudes en este navegador",
      Icon: UsersRound,
    },
    {
      title: "Interés en seminarios",
      value: interests.length,
      note: "Solicitudes de próxima fecha",
      Icon: CalendarDays,
    },
    {
      title: "Publicaciones",
      value: drafts.length,
      note: "Borradores locales guardados",
      Icon: Images,
    },
  ];
  return (
    <>
      <AdminHeading
        eyebrow="TU ACADEMIA, EN UN SOLO LUGAR"
        title="Hola. Hagamos crecer tu próximo paso."
        description="Programas, personas interesadas y contenido para compartir."
      >
        <Button href="/admin/publicaciones">Crear publicación</Button>
      </AdminHeading>
      <DemoNote />
      <div className="stats-grid">
        {stats.map(({ title, value, note, Icon }) => (
          <div className="stat-card" key={title}>
            <div>
              {title}
              <Icon size={18} aria-hidden="true" />
            </div>
            <strong>{value.toString().padStart(2, "0")}</strong>
            <small>{note}</small>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="admin-card">
          <div className="admin-card-heading">
            <h2>Últimas solicitudes</h2>
            <Link className="text-link" href="/admin/prematriculas">
              Ver todas
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
          {leads.length ? (
            <div>
              {leads
                .slice(-5)
                .reverse()
                .map((lead) => (
                  <div className="draft-item" key={lead.id}>
                    <div>
                      <strong style={{ fontSize: 11 }}>{lead.name}</strong>
                      <p>
                        {courses.find((c) => c.slug === lead.course)?.shortName}{" "}
                        · {lead.city}
                      </p>
                    </div>
                    <span style={{ fontSize: 9, color: "var(--rose)" }}>
                      {lead.status}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <div className="admin-empty">
              <ClipboardList size={31} aria-hidden="true" />
              <h3>Tu próxima conversación empieza aquí.</h3>
              <p>
                Las solicitudes aparecerán cuando se complete un formulario en
                este navegador.
              </p>
              <Link href="/contacto" className="text-link">
                Probar formulario
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          )}
        </section>
        <section className="admin-card studio-promo">
          <span className="eyebrow">EL TALLER DE CONTENIDO</span>
          <h2>
            Del curso a una publicación.
            <br />
            En unos pocos pasos.
          </h2>
          <p>
            Una identidad consistente. Cuatro plantillas. Tres formatos. Listo
            para compartir.
          </p>
          <div className="mini-template-row" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span className="mini-template" key={i} />
            ))}
          </div>
          <Button href="/admin/publicaciones">Abrir el taller</Button>
        </section>
      </div>
    </>
  );
}

function AdminCourseCard({
  course,
  override,
  onSave,
}: {
  course: Course;
  override: CourseOverride;
  onSave: (value: CourseOverride) => boolean;
}) {
  const [message, setMessage] = useState("");
  return (
    <article className="admin-course-card">
      <div className="admin-course-card-header">
        <ImagePlaceholder src={course.image} label={course.category} />
        <div>
          <span>
            {course.type.toUpperCase()} · {course.category.toUpperCase()}
          </span>
          <h2>{course.shortName}</h2>
          <p className="form-note">Datos actuales por confirmar.</p>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const saved = onSave({
            date: String(data.get("date") || ""),
            city: String(data.get("city") || ""),
            price: String(data.get("price") || ""),
            duration: String(data.get("duration") || ""),
          });
          setMessage(
            saved
              ? "Datos guardados para preparar publicaciones."
              : "No se pudieron guardar en este navegador.",
          );
        }}
      >
        <div className="form-grid">
          <div className="field">
            <label htmlFor={`${course.slug}-date`}>Próxima fecha</label>
            <input
              id={`${course.slug}-date`}
              name="date"
              defaultValue={override.date || ""}
              placeholder="Por confirmar"
              maxLength={50}
            />
          </div>
          <div className="field">
            <label htmlFor={`${course.slug}-city`}>Ciudad</label>
            <input
              id={`${course.slug}-city`}
              name="city"
              defaultValue={override.city || course.city}
              maxLength={40}
            />
          </div>
          <div className="field">
            <label htmlFor={`${course.slug}-price`}>Precio confirmado</label>
            <input
              id={`${course.slug}-price`}
              name="price"
              defaultValue={override.price || ""}
              placeholder="Por confirmar"
              maxLength={25}
            />
          </div>
          <div className="field">
            <label htmlFor={`${course.slug}-duration`}>Duración</label>
            <input
              id={`${course.slug}-duration`}
              name="duration"
              defaultValue={override.duration || course.duration || ""}
              placeholder="Por confirmar"
              maxLength={50}
            />
          </div>
        </div>
        <div className="admin-course-actions">
          <button type="submit" className="button button-secondary">
            Guardar en demo
            <Save size={13} aria-hidden="true" />
          </button>
          <Link
            className="button button-primary"
            href={`/admin/publicaciones?curso=${course.slug}`}
          >
            Crear publicación
            <Images size={13} aria-hidden="true" />
          </Link>
          <Link className="text-link" href={`/admin/cursos/${course.slug}`}>
            Ver ficha
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <p className="save-status" role="status">
          {message}
        </p>
      </form>
    </article>
  );
}
export function AdminCourses({ seminars = false }: { seminars?: boolean }) {
  const [overrides, setOverrides] = useLocalStore<
    Record<string, CourseOverride>
  >(storageKeys.courses, {});
  const items = courses.filter((course) =>
    seminars ? course.type === "Seminario" : course.type === "Curso",
  );
  return (
    <>
      <AdminHeading
        eyebrow="EL CATÁLOGO"
        title={seminars ? "Seminarios" : "Cursos"}
        description="Prepará los datos del programa y convertí su contenido en una publicación."
      />
      <DemoNote>
        Los cambios se guardan como datos de trabajo para publicaciones en este
        navegador. El catálogo público usa los archivos de datos del proyecto.
      </DemoNote>
      <div className="admin-course-grid">
        {items.map((course) => (
          <AdminCourseCard
            key={course.slug}
            course={course}
            override={overrides[course.slug] || {}}
            onSave={(value) =>
              setOverrides({ ...overrides, [course.slug]: value })
            }
          />
        ))}
      </div>
      {seminars && <SeminarInterests />}
    </>
  );
}
export function AdminCourseDetail({ slug }: { slug: string }) {
  const course = courses.find((c) => c.slug === slug)!;
  const [overrides, setOverrides] = useLocalStore<
    Record<string, CourseOverride>
  >(storageKeys.courses, {});
  return (
    <>
      <AdminHeading
        eyebrow="FICHA DEL PROGRAMA"
        title={course.name}
        description="Prepará los datos y creá una pieza gráfica con este programa."
      >
        <Button href={`/academia/${slug}`} variant="secondary">
          Vista pública
        </Button>
      </AdminHeading>
      <DemoNote>
        Los datos de trabajo se guardan en este navegador y se prellenan en el
        taller de publicaciones.
      </DemoNote>
      <div style={{ maxWidth: 720 }}>
        <AdminCourseCard
          course={course}
          override={overrides[slug] || {}}
          onSave={(value) => setOverrides({ ...overrides, [slug]: value })}
        />
      </div>
    </>
  );
}
function SeminarInterests() {
  const [items, setItems] = useLocalStore(
    storageKeys.notifications,
    emptyInterests,
  );
  const [message, setMessage] = useState("");
  return (
    <section className="admin-card" style={{ marginTop: 30 }}>
      <div className="admin-card-heading">
        <h2>Personas interesadas en próximas fechas · {items.length}</h2>
      </div>
      {items.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <caption className="sr-only">
              Interés en próximas convocatorias
            </caption>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Ciudad</th>
                <th scope="col">Tema</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    <small>{item.phone}</small>
                  </td>
                  <td>{item.city}</td>
                  <td>
                    {courses.find((c) => c.slug === item.topic)?.shortName}
                  </td>
                  <td>
                    <div className="table-actions">
                      <a
                        className="icon-button"
                        href={whatsappUrl(
                          `Hola ${item.name}, te contactamos de Belleza y Armonía sobre tu interés en ${courses.find((c) => c.slug === item.topic)?.shortName}.`,
                          item.phone.length <= 9
                            ? `505${item.phone.replace(/\D/g, "")}`
                            : item.phone,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Contactar a ${item.name}`}
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="icon-button"
                        aria-label={`Eliminar interés de ${item.name}`}
                        onClick={() =>
                          setMessage(
                            setItems(items.filter((i) => i.id !== item.id))
                              ? "Interés eliminado."
                              : "No se pudo guardar el cambio.",
                          )
                        }
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-empty">
          <CalendarDays size={27} aria-hidden="true" />
          <h3>Todavía no hay solicitudes de aviso.</h3>
          <p>
            Probá el formulario de la página de seminarios para ver el flujo.
          </p>
        </div>
      )}
      <p className="save-status" role="status">
        {message}
      </p>
    </section>
  );
}
export function AdminServices() {
  const [saved, setSaved] = useLocalStore<Record<string, string>>(
    storageKeys.services,
    {},
  );
  const [message, setMessage] = useState("");
  return (
    <>
      <AdminHeading
        eyebrow="EL SALÓN"
        title="Servicios"
        description="Categorías del salón y notas de trabajo para preparar la información definitiva."
      />
      <DemoNote>
        Las notas quedan en este navegador. Confirmá la lista real de servicios
        y sus condiciones con el negocio.
      </DemoNote>
      <div className="admin-course-grid">
        {services.map((service) => (
          <div key={service.id} className="admin-card">
            <h2>{service.name}</h2>
            <p style={{ marginBlock: "14px 24px" }}>{service.description}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                setMessage(
                  setSaved({
                    ...saved,
                    [service.id]: String(data.get("notes") || ""),
                  })
                    ? `Notas de ${service.name.toLowerCase()} guardadas.`
                    : "No se pudieron guardar las notas.",
                );
              }}
            >
              <div className="field">
                <label htmlFor={`notes-${service.id}`}>
                  Servicios y condiciones por confirmar
                </label>
                <textarea
                  id={`notes-${service.id}`}
                  name="notes"
                  defaultValue={saved[service.id] || ""}
                  placeholder="Anotá aquí la información que confirme el negocio."
                  maxLength={2000}
                />
              </div>
              <button
                type="submit"
                className="button button-secondary"
                style={{ marginTop: 20 }}
              >
                Guardar notas
                <Save size={14} aria-hidden="true" />
              </button>
            </form>
          </div>
        ))}
      </div>
      <p className="save-status" role="status">
        {message}
      </p>
    </>
  );
}

export function AdminLeads() {
  const [leads, setLeads] = useLocalStore(storageKeys.leads, emptyLeads);
  const [filter, setFilter] = useState("Todos");
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState<Lead | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visible = leads
    .filter((lead) => filter === "Todos" || lead.status === filter)
    .slice()
    .reverse();
  function exportCsv() {
    const escape = (value: string) =>
      `"${value.replace(/^[=+\-@]/, "'$&").replace(/"/g, '""')}"`;
    const header = [
      "Nombre",
      "WhatsApp",
      "Ciudad",
      "Programa",
      "Nivel",
      "Horario preferido",
      "Ciudad de estudio",
      "Estado",
      "Consentimiento",
      "Fecha",
    ];
    const data = [
      header,
      ...visible.map((lead) => [
        lead.name,
        lead.phone,
        lead.city,
        courses.find((c) => c.slug === lead.course)?.name || lead.course,
        lead.level,
        lead.schedule,
        lead.studyCity,
        lead.status,
        lead.consent ? "Sí" : "No",
        lead.createdAt,
      ]),
    ]
      .map((row) => row.map(escape).join(","))
      .join("\r\n");
    const blob = new Blob(["\uFEFF", data], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prematriculas-belleza-armonia.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("CSV exportado con las solicitudes filtradas.");
  }
  function closeDialog() {
    dialogRef.current?.close();
    setDeleting(null);
  }
  return (
    <>
      <AdminHeading
        eyebrow="PERSONAS, ANTES QUE NÚMEROS"
        title="Prematrículas"
        description="Consultas locales y seguimiento de cada conversación."
      />
      <DemoNote />
      <div className="leads-toolbar">
        <div className="filter-tabs">
          {["Todos", "Nuevo", "Contactado", "En seguimiento"].map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={filter === status}
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="button button-secondary"
          disabled={!visible.length}
          onClick={exportCsv}
        >
          Exportar CSV
          <Download size={15} aria-hidden="true" />
        </button>
      </div>
      {visible.length ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <caption className="sr-only">
              Solicitudes de información guardadas en este navegador
            </caption>
            <thead>
              <tr>
                <th scope="col">Persona</th>
                <th scope="col">Programa</th>
                <th scope="col">Preferencia</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <strong>{lead.name}</strong>
                    <small>
                      {lead.phone} · {lead.city}
                    </small>
                  </td>
                  <td>
                    {courses.find((c) => c.slug === lead.course)?.shortName}
                    <small>
                      {new Date(lead.createdAt).toLocaleDateString("es-NI")}
                    </small>
                  </td>
                  <td>
                    {lead.schedule}
                    <small>
                      {lead.studyCity} · {lead.level}
                    </small>
                  </td>
                  <td>
                    <select
                      value={lead.status}
                      aria-label={`Estado de solicitud de ${lead.name}`}
                      onChange={(e) =>
                        setMessage(
                          setLeads(
                            leads.map((item) =>
                              item.id === lead.id
                                ? {
                                    ...item,
                                    status: e.target.value as Lead["status"],
                                  }
                                : item,
                            ),
                          )
                            ? "Estado actualizado."
                            : "No se pudo guardar el estado.",
                        )
                      }
                    >
                      {["Nuevo", "Contactado", "En seguimiento"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="table-actions">
                      <a
                        className="icon-button"
                        href={whatsappUrl(
                          `Hola ${lead.name}, te contactamos de Belleza y Armonía sobre tu interés en ${courses.find((c) => c.slug === lead.course)?.shortName}.`,
                          lead.phone.replace(/\D/g, "").length === 8
                            ? `505${lead.phone}`
                            : lead.phone,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Contactar a ${lead.name}`}
                      >
                        <MessageCircle size={15} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="icon-button"
                        aria-label={`Eliminar solicitud de ${lead.name}`}
                        onClick={() => {
                          setDeleting(lead);
                          dialogRef.current?.showModal();
                        }}
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <section className="admin-card admin-empty">
          <UsersRound size={31} aria-hidden="true" />
          <h3>No hay solicitudes en esta vista.</h3>
          <p>Completá una prematrícula o elegí otro estado.</p>
          <Link href="/contacto" className="text-link">
            Probar el formulario
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </section>
      )}
      <p className="save-status" role="status">
        {message}
      </p>
      <dialog
        ref={dialogRef}
        className="confirm-modal"
        aria-labelledby="delete-heading"
        onCancel={() => setDeleting(null)}
      >
        <h2 id="delete-heading">¿Eliminar esta solicitud?</h2>
        <p>Se eliminará la consulta de {deleting?.name} de este navegador.</p>
        <div className="button-row">
          <button
            type="button"
            className="button button-secondary"
            onClick={closeDialog}
          >
            Conservar
          </button>
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              if (deleting)
                setMessage(
                  setLeads(leads.filter((item) => item.id !== deleting.id))
                    ? "Solicitud eliminada."
                    : "No se pudo eliminar la solicitud.",
                );
              closeDialog();
            }}
          >
            Eliminar
            <Trash2 size={14} aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}

export function AdminSettings() {
  const [settings, setSettings] = useLocalStore(
    storageKeys.settings,
    defaultSettings,
  );
  const [message, setMessage] = useState("");
  return (
    <>
      <AdminHeading
        eyebrow="LA IDENTIDAD PERMANECE"
        title="Configuración"
        description="Preferencias del taller de publicaciones y referencia del negocio."
      />
      <DemoNote>
        Las preferencias de esta demo se aplican al cargar un curso en el
        taller. Los datos públicos del sitio se actualizan en
        src/data/business.ts.
      </DemoNote>
      <section className="admin-card admin-settings">
        <h2>Preferencias para publicaciones</h2>
        <form
          key={JSON.stringify(settings)}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const phone = String(data.get("whatsapp") || "").trim();
            const city = String(data.get("city") || "").trim();
            if (phone.replace(/\D/g, "").length < 8 || !city) {
              setMessage("Ingresá un WhatsApp válido y una ciudad.");
              return;
            }
            setMessage(
              setSettings({ whatsapp: phone, defaultCity: city })
                ? "Preferencias guardadas."
                : "No se pudieron guardar las preferencias.",
            );
          }}
        >
          <div className="form-grid">
            <div className="field">
              <label htmlFor="setting-phone">WhatsApp para publicaciones</label>
              <input
                id="setting-phone"
                name="whatsapp"
                type="tel"
                defaultValue={settings.whatsapp}
                maxLength={24}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="setting-city">Ciudad predeterminada</label>
              <input
                id="setting-city"
                name="city"
                defaultValue={settings.defaultCity}
                maxLength={40}
                required
              />
            </div>
          </div>
          <button className="button button-primary" type="submit">
            Guardar preferencias
            <Check size={15} aria-hidden="true" />
          </button>
          <p className="save-status" role="status">
            {message}
          </p>
        </form>
      </section>
      <section className="admin-card admin-settings" style={{ marginTop: 25 }}>
        <h2>Información de referencia</h2>
        <p style={{ marginTop: 15 }}>
          {business.name}
          <br />
          {business.city}, {business.country}
          <br />
          {business.email}
          <br />
          {business.googleRating} ★ en Google · {business.googleReviews} reseñas
          observadas.
        </p>
        <p className="form-note">
          Dirección exacta, horarios, redes, precios y futuras convocatorias
          pendientes de confirmar. Las valoraciones proceden del brief y deben
          actualizarse antes de publicar.
        </p>
      </section>
    </>
  );
}
