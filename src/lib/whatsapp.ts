import { business } from "@/data/business";
export function whatsappUrl(message: string, phone = business.whatsapp) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message.trim() || "Hola, quisiera información de Belleza y Armonía.")}`;
}
export const courseMessage = (name: string) =>
  `Hola, quisiera información sobre ${name}. ¿Podrían compartirme la próxima fecha, horarios, requisitos y precio?`;
export const salonMessage = (name: string) =>
  `Hola, quisiera consultar los servicios de ${name.toLowerCase()} y la disponibilidad del salón Belleza y Armonía.`;
