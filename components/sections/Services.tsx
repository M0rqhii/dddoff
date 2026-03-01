import { Bug, Rat, ShieldPlus, Wind } from "lucide-react";
import type { ServicesContent } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bug,
  Rat,
  ShieldPlus,
  Wind,
};

export default function Services({ data }: { data: ServicesContent }) {
  return (
    <section id="uslugi" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full bg-green/10 px-5 py-1.5 font-sans text-sm font-semibold text-green">
            {data.badge}
          </span>
          <h2 className="font-heading text-4xl font-bold text-navy">
            {data.title}
          </h2>
          <p className="mt-4 max-w-2xl font-sans text-lg text-text-muted">
            {data.subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, i) => {
            const IconComp = iconMap[item.icon];

            return (
              <div
                key={i}
                className="service-card animate-fade-in group relative cursor-default overflow-hidden rounded-3xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span aria-hidden className="service-topline" />

                {/* Icon wrapper */}
                <div className="service-icon mx-auto mb-6 flex size-[70px] items-center justify-center rounded-2xl bg-green/10 text-green">
                  {IconComp && <IconComp className="size-8" />}
                </div>

                {/* Title */}
                <h3 className="mb-3 font-heading text-xl font-bold text-navy">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
