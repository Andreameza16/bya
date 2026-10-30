"use client";
import { useMemo, useSyncExternalStore } from "react";

export const storageKeys = {
  leads: "ba:leads:v1",
  notifications: "ba:notifications:v1",
  courses: "ba:courses:v1",
  settings: "ba:settings:v1",
  drafts: "ba:drafts:v1",
  services: "ba:services:v1",
};
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("ba-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("ba-storage", callback);
  };
}
export function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
export function writeLocal<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("ba-storage"));
    return true;
  } catch {
    return false;
  }
}
export function useLocalStore<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null,
  );
  const value = useMemo(() => {
    try {
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }, [raw, fallback]);
  return [value, (next: T) => writeLocal(key, next)] as const;
}

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  course: string;
  level: string;
  schedule: string;
  studyCity: string;
  consent: boolean;
  status: "Nuevo" | "Contactado" | "En seguimiento";
};
export type SeminarInterest = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  city: string;
  topic: string;
  consent: boolean;
};
export type CourseOverride = {
  date?: string;
  city?: string;
  price?: string;
  duration?: string;
};
export type StudioSettings = { whatsapp: string; defaultCity: string };
