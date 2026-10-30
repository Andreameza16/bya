import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import { AdminCourseDetail } from "@/components/admin";
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}
export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!courses.some((course) => course.slug === slug)) notFound();
  return <AdminCourseDetail slug={slug} />;
}
