import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Privacidad de la Demo de la Academia",
  "Conocé cómo funciona el almacenamiento local de esta demo de Belleza y Armonía y cómo compartir una solicitud de información mediante WhatsApp.",
  "/privacidad",
);
export default function PrivacyPage() {
  return (
    <article className="container privacy-page">
      <span className="eyebrow">
        DEMO COMERCIAL · INFORMACIÓN DE PRIVACIDAD
      </span>
      <h1>
        Tus datos,
        <br />
        <em>con claridad.</em>
      </h1>
      <h2>Solicitudes y preferencias</h2>
      <p>
        Esta demo guarda los formularios, las preferencias del panel y los
        borradores en el almacenamiento local de tu navegador. No dispone de una
        base de datos remota y los datos no se envían automáticamente al
        negocio. Otras personas que usen este mismo navegador pueden ver las
        solicitudes en el panel de demostración.
      </p>
      <h2>Contacto por WhatsApp</h2>
      <p>
        Al elegir “Enviar por WhatsApp”, abrís WhatsApp con un mensaje
        preparado. Revisalo y enviá el mensaje para comunicar tu solicitud al
        negocio. A partir de ese momento, WhatsApp y el negocio gestionan los
        datos compartidos.
      </p>
      <h2>Consentimiento y conservación</h2>
      <p>
        Solicitamos autorización de contacto en los formularios. Podés eliminar
        los registros desde el panel o borrando los datos del sitio en tu
        navegador. No se usan analíticas, rastreadores publicitarios ni cookies
        de marketing en esta demo.
      </p>
      <h2>Imágenes y fotografías</h2>
      <p>
        Las ilustraciones de esta demo son composiciones conceptuales. No
        representan fotografías de las instalaciones, del equipo ni de
        resultados reales. Las imágenes que subís al taller de publicaciones se
        procesan en tu navegador y no se envían a un servidor.
      </p>
      <h2>Antes del lanzamiento</h2>
      <p>
        El negocio deberá confirmar su política de privacidad, responsable de
        los datos, finalidad de contacto, plazo de conservación y medios para
        ejercer derechos, junto con el almacenamiento y el control de acceso del
        sistema definitivo.
      </p>
    </article>
  );
}
