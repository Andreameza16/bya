import { ImageResponse } from "next/og";
export const alt = "Belleza y Armonía · Academia y Salón en Masaya, Nicaragua";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#FAF7F3",
        color: "#211B1E",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 72,
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          letterSpacing: 4,
          color: "#B54770",
        }}
      >
        BELLEZA & ARMONÍA · ACADEMIA Y SALÓN
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 78,
          lineHeight: 1.1,
          maxWidth: 930,
        }}
      >
        Transformá tu talento en una profesión.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          borderTop: "1px solid #F0DDE4",
          paddingTop: 26,
          justifyContent: "space-between",
        }}
      >
        <span>Masaya, Nicaragua</span>
        <span>Cursos · Seminarios · Belleza</span>
      </div>
    </div>,
    size,
  );
}
