import type { DataStatus } from "./business";

export type Course = {
  slug: string;
  name: string;
  shortName: string;
  category: "Barbería" | "Uñas" | "Cabello";
  type: "Curso" | "Seminario";
  level: string | null;
  duration: string | null;
  durationStatus: DataStatus;
  price: string | null;
  date: string | null;
  city: string;
  description: string;
  topics: string[];
  image: string;
  instructorId?: string;
  status: DataStatus;
  verified: boolean;
};

export const courses: Course[] = [
  {
    slug: "barberia-profesional",
    name: "Curso Avanzado de Barbería Profesional",
    shortName: "Barbería Profesional",
    category: "Barbería",
    type: "Curso",
    level: "Avanzado",
    duration: null,
    durationStatus: "needs_confirmation",
    price: null,
    date: null,
    city: "Masaya",
    status: "historical",
    verified: false,
    description:
      "Explorá técnicas de corte, textura, diseño e imagen para seguir desarrollando tu práctica en barbería.",
    topics: [
      "Visajismo y asesoría de imagen",
      "Peinados europeos",
      "Freestyle avanzado",
      "Texturización y estructuras de rizos",
      "Diseño de color",
      "Keratina y alisados",
      "Tricología y aparatología",
      "Limpieza facial y maquillaje masculino",
      "Marketing para redes sociales",
      "Creación de contenido",
    ],
    image: "/images/courses/barberia.svg",
  },
  {
    slug: "unas-acrilicas",
    name: "Curso de Uñas Acrílicas",
    shortName: "Uñas Acrílicas",
    category: "Uñas",
    type: "Curso",
    level: "Básico e intermedio",
    duration: "3 meses",
    durationStatus: "historical",
    price: null,
    date: null,
    city: "Masaya",
    status: "historical",
    verified: false,
    description:
      "Un punto de partida para aprender aplicación, estructura, limado y diseño. No requiere experiencia previa.",
    topics: [
      "Aplicación de uñas acrílicas",
      "Estructura",
      "Técnicas de limado",
      "Diseños",
      "Tendencias",
    ],
    image: "/images/courses/unas.svg",
  },
  {
    slug: "rizos-permanentes",
    name: "Seminario de Rizos Permanentes",
    shortName: "Rizos Permanentes",
    category: "Cabello",
    type: "Seminario",
    level: null,
    duration: null,
    durationStatus: "needs_confirmation",
    price: null,
    date: null,
    city: "Masaya",
    status: "historical",
    verified: false,
    instructorId: "eddy-vargas",
    description:
      "Conocé los procesos de diagnóstico, enrollado y cuidado que forman parte de la técnica de rizos permanentes.",
    topics: [
      "Tipología del cabello y diagnóstico",
      "Productos y moldes / bigudíes",
      "Técnica de enrollado y tensiones",
      "Diseño según el rostro",
      "Ondulación y neutralización",
      "Control de tiempos",
      "Cuidado posterior",
      "Comercialización del servicio",
    ],
    image: "/images/courses/rizos.svg",
  },
  {
    slug: "alisado-organico",
    name: "Seminario de Alisado Orgánico",
    shortName: "Alisado Orgánico",
    category: "Cabello",
    type: "Seminario",
    level: null,
    duration: null,
    durationStatus: "needs_confirmation",
    price: null,
    date: null,
    city: "Masaya",
    status: "historical",
    verified: false,
    description:
      "Consultá el contenido, los requisitos y la próxima convocatoria de esta formación especializada.",
    topics: [],
    image: "/images/courses/alisado.svg",
  },
  {
    slug: "mechas-platinadas",
    name: "Seminario de Mechas Platinadas",
    shortName: "Mechas Platinadas",
    category: "Cabello",
    type: "Seminario",
    level: null,
    duration: null,
    durationStatus: "needs_confirmation",
    price: null,
    date: null,
    city: "Masaya",
    status: "historical",
    verified: false,
    description:
      "Descubrí una próxima especialización en color. Solicitá el temario y la información de la convocatoria.",
    topics: [],
    image: "/images/courses/mechas.svg",
  },
];
