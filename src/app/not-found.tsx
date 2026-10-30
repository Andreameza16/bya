import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">BELLEZA & ARMONÍA · 404</span>
      <h1>
        Volvamos a<br />
        <em>encontrar tu camino.</em>
      </h1>
      <p>La página que buscás no está disponible.</p>
      <Link className="button button-primary" href="/academia">
        Explorar la academia
      </Link>
    </main>
  );
}
