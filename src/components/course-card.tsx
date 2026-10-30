import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { Course } from "@/data/courses";
import { ImagePlaceholder } from "./ui";
export function CourseCard({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  return (
    <article className="course-card">
      <Link
        href={`/academia/${course.slug}`}
        className="course-image-link"
      >
        <ImagePlaceholder src={course.image} label={course.category} />
        <span className="course-index">0{index + 1}</span>
        <span className="image-arrow">
          <ArrowUpRight size={21} aria-hidden="true" />
        </span>
      </Link>
      <div className="course-card-meta">
        <span>
          {course.type} · {course.category}
        </span>
        {course.duration && (
          <span>
            <Clock3 size={12} aria-hidden="true" />
            {course.duration}
          </span>
        )}
      </div>
      <h3>
        <Link href={`/academia/${course.slug}`}>{course.shortName}</Link>
      </h3>
      <p>{course.level || "Formación especializada"}</p>
      <Link href={`/academia/${course.slug}`} className="course-card-link">
        Conocer programa
        <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </article>
  );
}
export function SeminarCard({
  course,
  index = 0,
}: {
  course: Course;
  index?: number;
}) {
  return <CourseCard course={course} index={index} />;
}
