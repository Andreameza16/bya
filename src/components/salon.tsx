"use client";
import { useState } from "react";
import { services } from "@/data/services";
import { ImagePlaceholder, WhatsAppButton } from "./ui";
import { salonMessage } from "@/lib/whatsapp";
export function ServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: (typeof services)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`service-card ${selected ? "selected" : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="service-number">0{services.indexOf(service) + 1}</span>
      <span>{service.name}</span>
      <span className="service-indicator" aria-hidden="true">
        {selected ? "−" : "+"}
      </span>
    </button>
  );
}
export function SalonExplorer() {
  const [selected, setSelected] = useState(services[0]);
  return (
    <div className="salon-explorer">
      <div>
        <span className="eyebrow">UN MOMENTO PARA VOS</span>
        <h2>
          Tu imagen.
          <br />
          <em>Tu esencia.</em>
        </h2>
        <div className="service-list">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={selected.id === service.id}
              onSelect={() => setSelected(service)}
            />
          ))}
        </div>
        <p className="service-description" aria-live="polite">
          {selected.description}
        </p>
        <WhatsAppButton message={salonMessage(selected.name)} variant="dark">
          Consultar disponibilidad
        </WhatsAppButton>
        <p className="form-note">
          Servicios, horarios y precios se confirman directamente con el salón.
        </p>
      </div>
      <ImagePlaceholder
        key={selected.id}
        src={selected.image}
        label={selected.name}
      />
    </div>
  );
}
