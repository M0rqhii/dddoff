import { Building2, Home, Briefcase, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ClientsContent } from "@/lib/types";

export default function Clients({ data }: { data: ClientsContent }) {
  return (
    <section id="dla-kogo" className="bg-slate-light py-24">
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
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {/* Firms card */}
          <div
            id="dla-firm"
            className="animate-fade-in group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-700 ease-out hover:-translate-y-[5px] hover:shadow-xl"
          >
            {/* Large faded background icon */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-[15rem] leading-none text-slate-200 opacity-50">
              <Building2 className="size-60" strokeWidth={0.5} />
            </div>

            {/* Content with gradient overlay */}
            <div className="relative z-10 bg-gradient-to-t from-white via-white/90 to-transparent p-10 pt-40">
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-green/10">
                  <Briefcase className="size-6 text-green" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {data.firms.title}
                </h3>
              </div>

              {/* List items with green dots */}
              <ul className="mb-8 flex flex-col gap-3">
                {data.firms.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="size-2 shrink-0 rounded-full bg-green" />
                    <span className="font-sans text-text">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Button
                asChild
                className="rounded-full bg-green px-6 font-sans font-semibold text-white shadow-md hover:bg-green-dark"
              >
                <a href="#abonamenty">
                  {data.firms.cta}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Individual card */}
          <div
            id="dla-klientow"
            className="animate-fade-in group relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-700 ease-out hover:-translate-y-[5px] hover:shadow-xl"
          >
            {/* Large faded background icon */}
            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-[15rem] leading-none text-slate-200 opacity-50">
              <Home className="size-60" strokeWidth={0.5} />
            </div>

            {/* Content with gradient overlay */}
            <div className="relative z-10 bg-gradient-to-t from-white via-white/90 to-transparent p-10 pt-40">
              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-navy/10">
                  <Heart className="size-6 text-navy" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy">
                  {data.individual.title}
                </h3>
              </div>

              {/* List items with navy dots */}
              <ul className="mb-8 flex flex-col gap-3">
                {data.individual.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="size-2 shrink-0 rounded-full bg-navy" />
                    <span className="font-sans text-text">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Button
                asChild
                className="rounded-full bg-navy px-6 font-sans font-semibold text-white shadow-md hover:bg-navy-dark"
              >
                <a href="#abonamenty">
                  {data.individual.cta}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
