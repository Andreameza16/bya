export type DataStatus =
  "confirmed" | "needs_confirmation" | "historical" | "demo_only";

export const business = {
  name: "Belleza y Armonía Salón y Academia",
  shortName: "Belleza y Armonía",
  city: "Masaya",
  country: "Nicaragua",
  whatsapp: "50587437145",
  displayPhone: "+505 8743 7145",
  email: "montielroymon85@gmail.com",
  googleRating: 4.5,
  googleReviews: 16,
  ratingStatus: "historical" as DataStatus,
  address: null,
  addressStatus: "needs_confirmation" as DataStatus,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Belleza+y+Armon%C3%ADa+Sal%C3%B3n+y+Academia+Masaya+Nicaragua",
  source:
    "Información aportada en el brief comercial. Confirmar vigencia con el negocio antes de publicar.",
  verified: false,
  cities: [
    "Masaya",
    "León",
    "Matagalpa",
    "Estelí",
    "Juigalpa",
    "Rivas",
    "Chinandega",
  ],
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const canIndex =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  siteUrl.startsWith("https://");
