import { courses } from "./courses";
export const seminars = courses.filter((course) => course.type === "Seminario");
export const seminarSchedule: {
  courseSlug: string;
  date: string;
  city: string;
}[] = [];
