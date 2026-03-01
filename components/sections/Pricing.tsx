import { ShieldHalf, Home, Check, CheckCircle, Gem, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PricingGroup } from "@/lib/types";

interface PricingProps {
  firms: PricingGroup;
  individual: PricingGroup;
}

export default function Pricing({ firms, individual }: PricingProps) {
  return (
    <section id="abonamenty" className="bg-slate-light py-24">
      <div className="mx-auto max-w-6xl px-5">
        {/* Main header */}
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-navy md:text-4xl">
            DDDoff - abonamenty DDD dla firm i klientów indywidualnych
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-muted">
            Wybierz plan dostosowany do Twoich potrzeb. Każdy abonament obejmuje
            pełną dokumentację i gwarancję skuteczności.
          </p>
        </div>

        {/* Firms Group */}
        <div className="mt-[60px]">
          {/* Group badge */}
          <div className="relative z-10 mb-[-25px] ml-5 inline-flex items-center gap-3 rounded-3xl border bg-white px-8 py-4 font-bold text-navy shadow-md">
            <ShieldHalf className="size-6 text-green" />
            <span>{firms.badge}</span>
          </div>

          {/* Firms pricing cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {firms.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ${
                  plan.popular ? "border-2 border-green" : "border border-transparent"
                }`}
              >
                {/* Popular ribbon */}
                {plan.popular && (
                  <div className="popular-ribbon">Najpopularniejszy</div>
                )}

                {/* Card header */}
                <div className="border-b p-8 text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy">
                    {plan.subtitle}
                  </p>
                  <h3 className="mt-2 font-heading text-3xl font-bold text-text">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-navy">
                      {plan.price}
                    </span>
                    <span className="text-lg font-medium text-text-muted">zł</span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{plan.period}</p>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-8">
                  <ul className="flex-1 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-5 shrink-0 text-green" />
                        <span className="text-sm text-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {plan.popular ? (
                      <Button className="w-full rounded-full bg-green font-semibold text-white shadow-md hover:bg-green-dark">
                        {plan.cta}
                        <ArrowRight className="size-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full rounded-full font-semibold"
                      >
                        {plan.cta}
                        <ArrowRight className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Group */}
        <div className="mt-[60px]">
          {/* Group badge */}
          <div className="relative z-10 mb-[-25px] ml-5 inline-flex items-center gap-3 rounded-3xl border bg-white px-8 py-4 font-bold text-navy shadow-md">
            <Home className="size-6 text-green" />
            <span>{individual.badge}</span>
          </div>

          {/* Individual pricing cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {individual.plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ${
                  plan.popular ? "border-2 border-green" : "border border-transparent"
                }`}
              >
                {/* Popular ribbon */}
                {plan.popular && (
                  <div className="popular-ribbon">Najpopularniejszy</div>
                )}

                {/* Card header */}
                <div className="border-b p-8 text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy">
                    {plan.subtitle}
                  </p>
                  <h3 className="mt-2 font-heading text-3xl font-bold text-text">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-navy">
                      {plan.price}
                    </span>
                    <span className="text-lg font-medium text-text-muted">zł</span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{plan.period}</p>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col p-8">
                  <ul className="flex-1 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 size-5 shrink-0 text-green" />
                        <span className="text-sm text-text">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {plan.popular ? (
                      <Button className="w-full rounded-full bg-green font-semibold text-white shadow-md hover:bg-green-dark">
                        {plan.cta}
                        <ArrowRight className="size-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full rounded-full font-semibold"
                      >
                        {plan.cta}
                        <ArrowRight className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium summary box */}
          {individual.premiumItems && individual.premiumItems.length > 0 && (
            <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="mb-4 flex justify-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-green/10">
                  <Gem className="size-7 text-green" />
                </div>
              </div>
              <h4 className="font-heading text-xl font-bold text-navy">
                Dodatkowe korzyści
              </h4>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                {individual.premiumItems.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="size-5 shrink-0 text-green" />
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
