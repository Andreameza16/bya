import { Suspense } from "react";
import { AdminHeading } from "@/components/admin";
import { SocialPostGenerator } from "@/components/social-post-generator";
export default function PostPage() {
  return (
    <>
      <AdminHeading
        eyebrow="EL TALLER DE CONTENIDO"
        title="Crear publicación"
        description="Vos ponés el contenido. La identidad se mantiene en cada pieza."
      />
      <Suspense fallback={<p role="status">Preparando el taller…</p>}>
        <SocialPostGenerator />
      </Suspense>
    </>
  );
}
