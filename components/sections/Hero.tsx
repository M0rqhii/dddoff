import {
  ShieldCheck,
  Clock,
  Users,
  FileText,
  ShieldHalf,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroContent } from "@/lib/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Clock,
  Users,
  FileText,
};

export default function Hero({ data }: { data: HeroContent }) {
  return (
    <section id="home" className="relative overflow-hidden bg-navy">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 pb-32 sm:px-6 lg:pt-20 lg:pb-40">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          {/* Left side - Text */}
          <div className="flex min-w-0 flex-col gap-8">
            {/* Badge */}
            <div className="inline-flex w-fit items-center rounded-full border border-green/40 bg-green/10 px-4 py-2">
              <span className="font-sans text-sm font-semibold text-green-light">
                {data.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {data.title}{" "}
              <span className="text-green-light">{data.titleHighlight}</span>
            </h1>

            {/* Description */}
            <p className="max-w-xl break-words font-sans text-base leading-relaxed text-slate-300 sm:text-lg">
              {data.description}
            </p>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                className="h-auto w-full rounded-full bg-green px-6 py-4 text-center whitespace-normal font-sans text-base font-semibold leading-tight text-white shadow-lg hover:bg-green-dark sm:w-auto sm:px-8 sm:py-6"
                size="lg"
              >
                <a href="#dla-firm">
                  {data.ctaPrimary}
                  <ArrowRight className="ml-2 size-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-auto w-full rounded-full border-white/30 bg-white/10 px-6 py-4 text-center whitespace-normal font-sans text-base font-semibold leading-tight text-white backdrop-blur-sm hover:bg-white/20 hover:text-white sm:w-auto sm:px-8 sm:py-6"
                size="lg"
              >
                <a href="#dla-klientow">{data.ctaSecondary}</a>
              </Button>
            </div>
          </div>

          {/* Right side - Glassmorphism card */}
          <div className="min-w-0 rounded-3xl border border-white/15 bg-white/7 p-6 backdrop-blur-xl sm:p-8">
            {/* Card header */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-green/20">
                <ShieldHalf className="size-6 text-green-light" />
              </div>
              <h2 className="font-heading text-xl font-bold text-white">
                {data.cardTitle}
              </h2>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-5">
              {data.stats.map((stat, i) => {
                const IconComp = iconMap[stat.icon];
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green/15">
                      {IconComp && (
                        <IconComp className="size-5 text-green-light" />
                      )}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-white">
                        {stat.title}
                      </p>
                      <p className="font-sans text-xs text-slate-400">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card CTA */}
            <div className="mt-8">
              <Button
                asChild
                className="w-full rounded-full bg-green px-6 py-5 font-sans font-semibold text-white shadow-lg hover:bg-green-dark"
              >
                <a href="#kontakt">
                  {data.cardCta}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Wave shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[90px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
}
