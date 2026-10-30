"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { courses } from "@/data/courses";
import { CourseCard } from "./course-card";
const filters = ["Todos", "Barbería", "Uñas", "Cabello", "Seminarios"];
export function CourseCatalog() {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const visible = courses.filter(
    (course) =>
      (filter === "Todos" ||
        course.category === filter ||
        (filter === "Seminarios" && course.type === "Seminario")) &&
      `${course.name} ${course.description}`
        .toLocaleLowerCase("es")
        .includes(search.toLocaleLowerCase("es")),
  );
  return (
    <>
      <div className="catalog-toolbar">
        <div className="filter-tabs" aria-label="Filtrar programas">
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Buscar un programa</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscá tu especialidad"
          />
        </label>
      </div>
      <p className="catalog-count" aria-live="polite">
        <SlidersHorizontal size={14} aria-hidden="true" />
        {visible.length}{" "}
        {visible.length === 1
          ? "programa para explorar"
          : "programas para explorar"}
      </p>
      {visible.length ? (
        <div className="course-grid catalog-grid">
          {visible.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={30} aria-hidden="true" />
          <h3>No encontramos ese programa.</h3>
          <p>Probá con otra búsqueda o consultanos por WhatsApp.</p>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setSearch("");
              setFilter("Todos");
            }}
          >
            Ver todos los programas
          </button>
        </div>
      )}
    </>
  );
}
