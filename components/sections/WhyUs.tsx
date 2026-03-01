import { FileText, FlaskConical, ClipboardList, HardHat } from "lucide-react";
import type { WhyUsContent } from "@/lib/types";

interface WhyUsProps {
  data: WhyUsContent;
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  FileText,
  FlaskConical,
  ClipboardList,
  HardHat,
};

export default function WhyUs({ data }: WhyUsProps) {
  return (
    <section className="bg-white py-24 text-center">
      <div className="mx-auto max-w-6xl px-5">
        {/* Badge */}
        <div className="mb-4 inline-flex rounded-full bg-green/10 px-5 py-2 text-xs font-bold uppercase tracking-wider text-green">
          {data.badge}
        </div>

        {/* Header */}
        <h2 className="font-heading text-3xl font-extrabold text-navy md:text-4xl">
          {data.title}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-text-muted">
          {data.subtitle}
        </p>

        {/* Grid */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
          {data.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-[5px] hover:shadow-md"
              >
                {/* Icon */}
                <div className="mx-auto mb-4 flex size-[50px] items-center justify-center rounded-xl bg-green/10">
                  {Icon && <Icon className="size-6 text-green" />}
                </div>

                {/* Content */}
                <h4 className="font-heading text-lg font-bold text-text">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm text-text-muted">
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
