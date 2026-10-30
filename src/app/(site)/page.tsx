import {
  ArrowDown,
  ArrowUpRight,
  Scissors,
  Sparkles,
  GraduationCap,
  MapPin,
  Plus,
} from "lucide-react";
import { courses } from "@/data/courses";
import { business } from "@/data/business";
import { CourseCard } from "@/components/course-card";
import {
  Button,
  CityChip,
  FinalCTA,
  ImagePlaceholder,
  RatingBadge,
  SectionHeader,
  TextLink,
  WhatsAppButton,
} from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="tiny-line" />
              ACADEMIA Y SALÓN · MASAYA
            </div>
            <h1>
              Transformá
              <br />
              tu talento en
              <br />
              <em>una profesión.</em>
            </h1>
            <p>
              El arte de la belleza se aprende haciendo. Explorá cursos y
              seminarios para dar el próximo paso en lo que te apasiona.
            </p>
            <div className="button-row">
              <Button href="/academia">Explorar cursos</Button>
              <WhatsAppButton message="Hola, quisiera conocer los cursos de la academia Belleza y Armonía.">
                Consultar por WhatsApp
              </WhatsAppButton>
            </div>
            <div className="hero-proof">
              <RatingBadge />
              <span className="hero-proof-divider" />
              <span className="hero-location">
                <MapPin size={16} aria-hidden="true" />
                Desde Masaya,
                <br />
                para Nicaragua.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <ImagePlaceholder
                src="/images/business/hero.svg"
                label="El arte de aprender"
                priority
              />
              <div className="hero-visual-top">
                <span>
                  UNA NUEVA
                  <br />
                  FORMA DE CREAR.
                </span>
                <Plus size={23} strokeWidth={1} aria-hidden="true" />
              </div>
              <div className="hero-image-caption">
                <span>BELLEZA & ARMONÍA</span>
                <span>01 / ACADEMIA</span>
              </div>
            </div>
            <div className="hero-floating-note">
              <GraduationCap size={25} strokeWidth={1.2} aria-hidden="true" />
              <div>
                <strong>Tu talento. Tu siguiente paso.</strong>
                <span>Formación en belleza y barbería.</span>
              </div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </div>
            <span className="hero-side-note">
              TÉCNICA · CREATIVIDAD · PROFESIÓN
            </span>
          </div>
        </div>
        <div className="container hero-bottom">
          <a href="#programas">
            DESCUBRÍ TU CAMINO
            <ArrowDown size={13} aria-hidden="true" />
          </a>
          <span>Aprendé. Creá. Encontrá tu especialidad.</span>
        </div>
      </section>
      <div className="discipline-strip">
        <div className="container">
          <span>
            <Scissors size={18} aria-hidden="true" />
            BARBERÍA
          </span>
          <Plus size={13} aria-hidden="true" />
          <span>DISEÑO DE UÑAS</span>
          <Plus size={13} aria-hidden="true" />
          <span>COLOR & TEXTURA</span>
          <Plus size={13} aria-hidden="true" />
          <span>FORMACIÓN PROFESIONAL</span>
        </div>
      </div>
      <section id="programas" className="section container">
        <SectionHeader
          eyebrow="ENCONTRÁ TU CAMINO"
          title={
            <>
              Elegí tu <em>especialidad.</em>
            </>
          }
          description="De tu primera técnica a tu próxima especialización. Conocé las opciones de formación de la academia."
        >
          <TextLink href="/academia">Todos los programas</TextLink>
        </SectionHeader>
        <div className="course-grid">
          {courses.slice(0, 4).map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>
        <div className="catalog-footnote">
          <span>Fechas y precios por confirmar con la academia.</span>
          <span>01 — FORMACIÓN QUE INSPIRA</span>
        </div>
      </section>
      <section className="method-section">
        <div className="container method-grid">
          <div className="method-art">
            <ImagePlaceholder
              src="/images/business/practica.svg"
              label="Técnica y creatividad"
            />
            <span className="method-art-number">
              El talento
              <br />
              <em>se cultiva.</em>
            </span>
          </div>
          <div className="method-copy">
            <span className="eyebrow">LA ESENCIA DE APRENDER</span>
            <h2>
              Aprender
              <br />
              <em>haciendo.</em>
            </h2>
            <p>
              Una profesión comienza con curiosidad y se construye técnica a
              técnica. Explorá una formación conectada con la práctica de la
              belleza.
            </p>
            <div className="method-points">
              {[
                [
                  "01",
                  "De la técnica a la práctica",
                  "Explorá contenidos aplicables al trabajo de belleza y barbería.",
                ],
                [
                  "02",
                  "Un camino a tu medida",
                  "Encontrá una especialidad acorde con tus intereses y tu nivel.",
                ],
                [
                  "03",
                  "Mirada profesional",
                  "Consultá las opciones de acompañamiento y formación de cada programa.",
                ],
              ].map(([number, title, text]) => (
                <div key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <TextLink href="/nosotros">Conocé Belleza y Armonía</TextLink>
          </div>
        </div>
      </section>
      <section className="section container cities-section">
        <SectionHeader
          eyebrow="EL CONOCIMIENTO NO TIENE UNA SOLA DIRECCIÓN"
          title={
            <>
              Formación más allá
              <br />
              de <em>Masaya.</em>
            </>
          }
          description="La formación ha llegado a distintas ciudades de Nicaragua. Encontrá tu próxima especialización y consultá una nueva convocatoria."
        />
        <div className="cities-editorial">
          <div
            className="city-map"
            aria-label="Ciudades con referencias históricas de seminarios"
          >
            <span className="map-title">NICARAGUA</span>
            <svg viewBox="0 0 500 300" aria-hidden="true">
              <path
                d="M120 60 L220 28 L360 48 L426 106 L391 209 L305 270 L184 244 L75 152 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M120 60 Q140 180 305 270 M220 28 Q190 160 391 209 M75 152 Q270 120 426 106"
                fill="none"
                stroke="currentColor"
                strokeDasharray="3 7"
              />
              {[
                [125, 128],
                [167, 107],
                [238, 87],
                [277, 117],
                [309, 185],
                [215, 200],
                [263, 244],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={i === 5 ? 9 : 4}
                    fill="currentColor"
                  />
                  {i === 5 && (
                    <circle
                      cx={x}
                      cy={y}
                      r="19"
                      fill="none"
                      stroke="currentColor"
                    />
                  )}
                </g>
              ))}
            </svg>
            <span className="map-caption">
              Representación abstracta · presencia histórica
            </span>
          </div>
          <div>
            <div className="city-chips">
              {business.cities.map((city) => (
                <CityChip key={city} city={city} active={city === "Masaya"} />
              ))}
            </div>
            <div className="next-date">
              <span className="small-dot" />
              <p>
                Próximas fechas por confirmar.
                <br />
                <small>Enterate cuando haya una nueva convocatoria.</small>
              </p>
            </div>
            <Button href="/seminarios" variant="secondary">
              Ver próximos seminarios
            </Button>
          </div>
        </div>
      </section>
      <section className="rating-section">
        <div className="container rating-inner">
          <div>
            <span className="eyebrow">UNA REFERENCIA PARA CONOCERNOS</span>
            <h2>
              La confianza también
              <br />
              forma parte del camino.
            </h2>
          </div>
          <div className="rating-large">
            <span>
              {business.googleRating}
              <StarRow />
            </span>
            <p>
              {business.googleReviews} reseñas · valoración observada en Google
            </p>
            <a
              href={business.mapsUrl}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver ubicación
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section className="salon-feature">
        <div className="container salon-feature-grid">
          <div>
            <span className="eyebrow">BELLEZA & ARMONÍA · EL SALÓN</span>
            <h2>
              También cuidamos
              <br />
              <em>tu imagen.</em>
            </h2>
            <p>
              Un espacio para vos. Consultá opciones de cabello, uñas y
              estética, y contanos qué tenés en mente.
            </p>
            <div className="salon-categories">
              <span>Cabello</span>
              <span>Uñas</span>
              <span>Estética</span>
            </div>
            <Button href="/salon" variant="dark">
              Explorar el salón
            </Button>
          </div>
          <div className="salon-feature-art">
            <ImagePlaceholder
              src="/images/salon/estetica.svg"
              label="Cuidado y armonía"
            />
            <span className="salon-art-caption">
              <Sparkles size={19} aria-hidden="true" />
              El arte de sentirte vos.
            </span>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
function StarRow() {
  return (
    <span className="star-row" role="img" aria-label="4.5 de 5 estrellas">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}
