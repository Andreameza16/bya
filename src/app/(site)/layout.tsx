import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppCTA } from "@/components/ui";
import { business, siteUrl } from "@/data/business";
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${siteUrl}/#organization`,
    name: business.name,
    url: siteUrl,
    telephone: `+${business.whatsapp}`,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressCountry: "NI",
    },
  };
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
