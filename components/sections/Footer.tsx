import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import type { FooterContent } from "@/lib/types";

interface FooterProps {
  data: FooterContent;
}

const socialIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Facebook,
  Instagram,
  Linkedin,
};

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-navy-footer pt-12 pb-2 text-gray-400">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr]">
          {/* Column 1: Logo + About */}
          <div>
            <a href="#home" className="inline-block">
              <span className="font-heading text-3xl font-extrabold">
                <span className="text-white">DDD</span>
                <span className="text-green">off</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed">{data.about}</p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {data.socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                if (!Icon) return null;

                const isExternal =
                  social.href.startsWith("https://") ||
                  social.href.startsWith("http://");

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className="flex size-10 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-green hover:bg-green hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="relative mb-6 font-heading text-sm font-bold uppercase tracking-wider text-white">
              Szybkie Linki
              <span className="mt-2 block h-[3px] w-10 bg-green" />
            </h4>
            <ul className="space-y-3">
              {data.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:pl-1 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="relative mb-6 font-heading text-sm font-bold uppercase tracking-wider text-white">
              Nasze Usługi
              <span className="mt-2 block h-[3px] w-10 bg-green" />
            </h4>
            <ul className="space-y-3">
              {data.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-all duration-300 hover:pl-1 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="relative mb-6 font-heading text-sm font-bold uppercase tracking-wider text-white">
              Prawne
              <span className="mt-2 block h-[3px] w-10 bg-green" />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/polityka-prywatnosci"
                  className="text-sm transition-all duration-300 hover:pl-1 hover:text-white"
                >
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link
                  href="/polityka-cookies"
                  className="text-sm transition-all duration-300 hover:pl-1 hover:text-white"
                >
                  Polityka cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="relative mb-6 font-heading text-sm font-bold uppercase tracking-wider text-white">
              Kontakt
              <span className="mt-2 block h-[3px] w-10 bg-green" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-green" />
                <span className="text-sm">{data.contactAddress}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-green" />
                <span className="text-sm">{data.contactPhone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-green" />
                <span className="text-sm">{data.contactEmail}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-green" />
                <span className="text-sm">{data.contactHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 border-t border-white/5 py-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
