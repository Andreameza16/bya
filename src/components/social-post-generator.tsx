"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Download,
  UploadCloud,
  Save,
  RotateCcw,
  Trash2,
  ImagePlus,
} from "lucide-react";
import { courses, type Course } from "@/data/courses";
import { business } from "@/data/business";
import {
  readLocal,
  storageKeys,
  useLocalStore,
  type CourseOverride,
  type StudioSettings,
} from "@/lib/local-store";
import {
  postFormats,
  postTemplates,
  renderPost,
  type Crop,
  type PostContent,
  type PostFormat,
  type TemplateId,
} from "@/lib/post-renderer";

const types = [
  "Nuevo curso",
  "Inscripciones abiertas",
  "Seminario",
  "Promoción del salón",
  "Últimos cupos",
  "Próxima fecha",
  "Graduación",
];
const defaultSettings: StudioSettings = {
  whatsapp: business.displayPhone,
  defaultCity: business.city,
};
type Draft = {
  id: string;
  createdAt: string;
  content: PostContent;
  template: TemplateId;
  format: PostFormat;
  photo: string;
  crop: Crop;
};
const emptyDrafts: Draft[] = [];
function courseContent(
  course: Course,
  settings: StudioSettings,
  draft: CourseOverride = {},
): PostContent {
  const duration = draft.duration || course.duration;
  return {
    type: course.type === "Seminario" ? "Seminario" : "Nuevo curso",
    title: course.shortName,
    subtitle: duration
      ? `${course.level || "Formación especializada"} · ${duration}`
      : "Formación en belleza y barbería",
    date: draft.date || "Fecha por confirmar",
    city: draft.city || settings.defaultCity || course.city,
    price: draft.price || "",
    whatsapp: settings.whatsapp || business.displayPhone,
    cta: "Solicitá información",
  };
}

export function PostTemplate({
  selected,
  onSelect,
}: {
  selected: TemplateId;
  onSelect: (id: TemplateId) => void;
}) {
  return (
    <div className="template-selector" aria-label="Plantillas de publicación">
      {postTemplates.map((template) => (
        <button
          type="button"
          key={template.id}
          className={`template-option ${selected === template.id ? "active" : ""}`}
          aria-pressed={selected === template.id}
          onClick={() => onSelect(template.id)}
        >
          <span style={{ background: template.color }} />
          <strong>{template.name}</strong>
        </button>
      ))}
    </div>
  );
}
export function ImageCropper({
  crop,
  onChange,
  onUpload,
  uploading,
}: {
  crop: Crop;
  onChange: (crop: Crop) => void;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  return (
    <div>
      <label className="upload-area">
        <UploadCloud size={20} aria-hidden="true" />
        <span>
          {uploading
            ? "Preparando fotografía…"
            : "Subí tu foto · JPG, PNG o WebP"}
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-label="Subir fotografía para la publicación"
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onUpload(file);
            event.target.value = "";
          }}
        />
      </label>
      <div className="crop-controls">
        <label htmlFor="crop-zoom">
          Zoom
          <input
            id="crop-zoom"
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={crop.zoom}
            onChange={(e) =>
              onChange({ ...crop, zoom: Number(e.target.value) })
            }
          />
        </label>
        <label htmlFor="crop-x">
          Posición horizontal
          <input
            id="crop-x"
            type="range"
            min="-100"
            max="100"
            value={crop.x}
            onChange={(e) => onChange({ ...crop, x: Number(e.target.value) })}
          />
        </label>
        <label htmlFor="crop-y">
          Posición vertical
          <input
            id="crop-y"
            type="range"
            min="-100"
            max="100"
            value={crop.y}
            onChange={(e) => onChange({ ...crop, y: Number(e.target.value) })}
          />
        </label>
      </div>
      <p className="form-note">
        El recorte se aplica dentro del área de foto de la plantilla. La
        composición y la tipografía conservan la identidad.
      </p>
    </div>
  );
}

export function SocialPostGenerator() {
  const params = useSearchParams();
  const initialCourse =
    courses.find((c) => c.slug === params.get("curso")) || courses[0];
  const [selectedSlug, setSelectedSlug] = useState(initialCourse.slug);
  const selectedCourse =
    courses.find((c) => c.slug === selectedSlug) || initialCourse;
  const [settings] = useLocalStore(storageKeys.settings, defaultSettings);
  const [overrides] = useLocalStore<Record<string, CourseOverride>>(
    storageKeys.courses,
    {},
  );
  const [content, setContent] = useState<PostContent>(() => ({
    type: selectedCourse.type === "Seminario" ? "Seminario" : "Nuevo curso",
    title: selectedCourse.shortName,
    subtitle: selectedCourse.duration
      ? `${selectedCourse.level} · ${selectedCourse.duration}`
      : "Formación en belleza y barbería",
    date: "Fecha por confirmar",
    city: selectedCourse.city,
    price: "",
    whatsapp: business.displayPhone,
    cta: "Solicitá información",
  }));
  const [photo, setPhoto] = useState(selectedCourse.image);
  const [template, setTemplate] = useState<TemplateId>(
    selectedCourse.type === "Seminario" ? "seminar" : "editorial",
  );
  const [format, setFormat] = useState<PostFormat>("portrait");
  const [crop, setCrop] = useState<Crop>({ zoom: 1, x: 0, y: 0 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [rendered, setRendered] = useState("");
  const [drafts, setDrafts] = useLocalStore(storageKeys.drafts, emptyDrafts);
  const canvas = useRef<HTMLCanvasElement>(null);
  const signature = JSON.stringify({ content, photo, template, format, crop });
  const ready = rendered === signature && !uploading;

  useEffect(() => {
    let live = true;
    Promise.resolve().then(() => {
      if (!live) return;
      const preferences = readLocal(storageKeys.settings, defaultSettings);
      const saved = readLocal<Record<string, CourseOverride>>(
        storageKeys.courses,
        {},
      );
      setSelectedSlug(initialCourse.slug);
      setContent(
        courseContent(initialCourse, preferences, saved[initialCourse.slug]),
      );
      setPhoto(initialCourse.image);
      setTemplate(initialCourse.type === "Seminario" ? "seminar" : "editorial");
      setCrop({ zoom: 1, x: 0, y: 0 });
    });
    return () => {
      live = false;
    };
  }, [initialCourse]);

  useEffect(() => {
    let live = true;
    const loaded = new window.Image();
    loaded.onload = () => {
      if (live) setImage(loaded);
    };
    loaded.onerror = () => {
      if (live)
        setMessage("No se pudo cargar la imagen. Subí otra fotografía.");
    };
    loaded.src = photo;
    return () => {
      live = false;
      loaded.onload = null;
      loaded.onerror = null;
    };
  }, [photo]);
  useEffect(() => {
    if (!image || (!image.src.endsWith(photo) && image.src !== photo)) return;
    let live = true;
    document.fonts.ready.then(() => {
      if (!live || !canvas.current) return;
      try {
        const style = getComputedStyle(document.documentElement);
        renderPost(canvas.current, content, image, template, format, crop, {
          display: style.getPropertyValue("--font-display") || "Georgia",
          interface: style.getPropertyValue("--font-interface") || "Arial",
        });
        setRendered(signature);
      } catch {
        setMessage(
          "No pudimos generar la vista previa. Probá con otra imagen.",
        );
      }
    });
    return () => {
      live = false;
    };
  }, [image, photo, content, template, format, crop, signature]);

  function loadCourse(slug: string) {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return;
    const draft = overrides[slug] || {};
    setSelectedSlug(course.slug);
    setContent(courseContent(course, settings, draft));
    setPhoto(course.image);
    setCrop({ zoom: 1, x: 0, y: 0 });
    setTemplate(course.type === "Seminario" ? "seminar" : "editorial");
    setMessage("Datos del curso cargados. Revisalos antes de descargar.");
  }
  async function upload(file: File) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Elegí una imagen JPG, PNG o WebP.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setMessage("La imagen debe pesar menos de 15 MB.");
      return;
    }
    setUploading(true);
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 2200 / Math.max(bitmap.width, bitmap.height));
      const resized = document.createElement("canvas");
      resized.width = Math.round(bitmap.width * scale);
      resized.height = Math.round(bitmap.height * scale);
      const ctx = resized.getContext("2d");
      if (!ctx) throw new Error();
      ctx.fillStyle = "#FAF7F3";
      ctx.fillRect(0, 0, resized.width, resized.height);
      ctx.drawImage(bitmap, 0, 0, resized.width, resized.height);
      bitmap.close();
      setPhoto(resized.toDataURL("image/jpeg", 0.9));
      setCrop({ zoom: 1, x: 0, y: 0 });
      setMessage("Foto lista. Ajustá el recorte en la vista previa.");
    } catch {
      setMessage("No se pudo leer esta imagen. Probá con otro archivo.");
    } finally {
      setUploading(false);
    }
  }
  function download() {
    if (!ready || !canvas.current || !content.title.trim()) {
      setMessage(
        "Completá el título y esperá a que se actualice la vista previa.",
      );
      return;
    }
    try {
      canvas.current.toBlob((blob) => {
        if (!blob) {
          setMessage("No se pudo exportar el PNG.");
          return;
        }
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `belleza-armonia-${template}-${format}.png`;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        setMessage("PNG generado con la resolución seleccionada.");
      }, "image/png");
    } catch {
      setMessage(
        "No se pudo exportar. Probá con una imagen cargada desde tu dispositivo.",
      );
    }
  }
  function saveDraft() {
    if (!content.title.trim()) {
      setMessage("Agregá un título antes de guardar.");
      return;
    }
    const draft: Draft = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      content,
      template,
      format,
      photo,
      crop,
    };
    const saved = setDrafts([
      ...readLocal<Draft[]>(storageKeys.drafts, []),
      draft,
    ]);
    setMessage(
      saved
        ? "Borrador guardado en este navegador."
        : "No hay espacio para guardar este borrador. Descargá el PNG o usá una foto más liviana.",
    );
  }
  const fields: { key: keyof PostContent; label: string; max: number }[] = [
    { key: "title", label: "Título", max: 100 },
    { key: "subtitle", label: "Subtítulo", max: 150 },
    { key: "date", label: "Fecha", max: 50 },
    { key: "city", label: "Ciudad", max: 40 },
    { key: "price", label: "Precio · opcional", max: 25 },
    { key: "whatsapp", label: "WhatsApp", max: 24 },
    { key: "cta", label: "Llamado a la acción", max: 40 },
  ];
  return (
    <div className="generator-layout">
      <div className="generator-controls">
        <h2>01 / El contenido</h2>
        <div className="field">
          <label htmlFor="post-course">Cargar un programa</label>
          <select
            id="post-course"
            value={selectedCourse.slug}
            onChange={(e) => loadCourse(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.shortName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-link"
            onClick={() => loadCourse(selectedCourse.slug)}
          >
            Aplicar datos guardados del curso
          </button>
        </div>
        <div className="field">
          <label htmlFor="post-type">Tipo de publicación</label>
          <select
            id="post-type"
            value={content.type}
            onChange={(e) => setContent({ ...content, type: e.target.value })}
          >
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="form-grid">
          {fields.map((field) => (
            <div
              className={`field ${["title", "subtitle", "cta"].includes(field.key) ? "full-width" : ""}`}
              key={field.key}
            >
              <label htmlFor={`post-${field.key}`}>{field.label}</label>
              <input
                id={`post-${field.key}`}
                value={content[field.key]}
                maxLength={field.max}
                onChange={(e) =>
                  setContent({ ...content, [field.key]: e.target.value })
                }
              />
            </div>
          ))}
        </div>
        <div className="generator-section">
          <h2>02 / La imagen</h2>
          <ImageCropper
            crop={crop}
            onChange={setCrop}
            onUpload={upload}
            uploading={uploading}
          />
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setPhoto(selectedCourse.image);
              setCrop({ zoom: 1, x: 0, y: 0 });
            }}
          >
            Usar imagen conceptual del programa
            <ImagePlus size={15} aria-hidden="true" />
          </button>
        </div>
        <div className="generator-section">
          <h2>03 / La composición</h2>
          <PostTemplate selected={template} onSelect={setTemplate} />
          <span className="eyebrow">FORMATO DE SALIDA</span>
          <div className="format-selector">
            {postFormats.map((f) => (
              <button
                type="button"
                key={f.id}
                aria-pressed={format === f.id}
                className={format === f.id ? "active" : ""}
                onClick={() => setFormat(f.id)}
              >
                <strong>{f.name}</strong>
                {f.width} × {f.height}
              </button>
            ))}
          </div>
          <p className="form-note">
            Confirmá fechas, precios y condiciones antes de publicar una pieza.
          </p>
        </div>
      </div>
      <div className="generator-preview-panel">
        <div className="generator-preview-top">
          <span>Vista previa</span>
          <span>GENERADO EN TU NAVEGADOR</span>
        </div>
        <div className={`canvas-stage ${format}`}>
          <canvas
            ref={canvas}
            width={1080}
            height={1350}
            role="img"
            aria-label={`Vista previa de publicación: ${content.title}. ${content.subtitle}. ${content.date}, ${content.city}. ${content.cta}.`}
          />
        </div>
        <button
          type="button"
          className="button button-primary generator-download"
          disabled={!ready || !content.title.trim()}
          onClick={download}
        >
          Descargar PNG
          <Download size={17} aria-hidden="true" />
        </button>
        <div className="generator-draft-actions">
          <button
            type="button"
            className="button button-secondary"
            onClick={saveDraft}
          >
            Guardar borrador
            <Save size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setCrop({ zoom: 1, x: 0, y: 0 });
              setMessage("Recorte restablecido.");
            }}
          >
            Restablecer foto
            <RotateCcw size={15} aria-hidden="true" />
          </button>
        </div>
        <p className="generator-preview-note">
          Sin IA, sin enviar fotos a un servidor. La exportación funciona con
          Canvas.
        </p>
        <p className="generator-message" role="status" aria-live="polite">
          {message ||
            (!ready
              ? "Preparando vista previa…"
              : "Vista previa lista para descargar.")}
        </p>
        <div className="draft-list">
          <h3>Borradores de este navegador · {drafts.length}</h3>
          {drafts.length ? (
            drafts.map((draft) => (
              <div className="draft-item" key={draft.id}>
                <button
                  type="button"
                  onClick={() => {
                    setContent(draft.content);
                    setTemplate(draft.template);
                    setFormat(draft.format);
                    setPhoto(draft.photo);
                    setCrop(draft.crop);
                    setMessage("Borrador cargado.");
                  }}
                >
                  {draft.content.title}
                  <small>
                    {postTemplates.find((t) => t.id === draft.template)?.name} ·{" "}
                    {new Date(draft.createdAt).toLocaleDateString("es-NI")}
                  </small>
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Eliminar borrador ${draft.content.title}`}
                  onClick={() =>
                    setMessage(
                      setDrafts(drafts.filter((d) => d.id !== draft.id))
                        ? "Borrador eliminado."
                        : "No se pudo eliminar.",
                    )
                  }
                >
                  <Trash2 size={14} aria-hidden="true" />
                </button>
              </div>
            ))
          ) : (
            <p className="form-note">
              Todavía no hay borradores. Guardá una composición para continuar
              después.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
