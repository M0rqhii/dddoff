"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Check, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_PACKAGE_EVENT,
  type ContactPackageEventDetail,
} from "@/lib/contact-package-event";
import type { ContactContent } from "@/lib/types";

interface ContactProps {
  data: ContactContent;
  packageOptions: string[];
}

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Phone,
  Mail,
  MapPin,
};

export default function Contact({ data, packageOptions }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handlePackageSelect(event: Event) {
      const customEvent = event as CustomEvent<ContactPackageEventDetail>;
      const selectedPackage = customEvent.detail?.packageName?.trim();
      if (selectedPackage) {
        setPackageName(selectedPackage);
      }
    }

    window.addEventListener(CONTACT_PACKAGE_EVENT, handlePackageSelect);
    return () => window.removeEventListener(CONTACT_PACKAGE_EVENT, handlePackageSelect);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, packageName, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Wystąpił błąd.");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setPackageName("");
      setDescription("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Nie udało się wysłać wiadomości.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="kontakt" className="relative bg-navy py-24 text-white">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/95 to-navy/85" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 px-5 lg:flex-row">
        {/* Left side */}
        <div className="flex-1">
          {/* Badge */}
          <div className="mb-6 inline-flex rounded-full border border-green/40 bg-green/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-green-light">
            {data.badge}
          </div>

          {/* Title */}
          <h2 className="font-heading text-4xl font-extrabold text-white lg:text-5xl">
            {data.title}
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-300">
            {data.description}{" "}
            <span className="font-semibold text-green-light">
              {data.descriptionHighlight}
            </span>
            .
          </p>

          {/* Contact methods */}
          <div className="mt-10 space-y-6">
            {data.methods.map((method) => {
              const Icon = iconMap[method.icon];
              return (
                <div key={method.label} className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green/10">
                    {Icon && <Icon className="size-5 text-green" />}
                  </div>
                  <div>
                    {method.href ? (
                      <a
                        href={method.href}
                        className="text-lg font-semibold text-white transition-colors hover:text-green-light"
                      >
                        {method.label}
                      </a>
                    ) : (
                      <span className="text-lg font-semibold text-white">
                        {method.label}
                      </span>
                    )}
                    <p className="text-sm text-gray-400">{method.sublabel}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust items */}
          <div className="mt-10 flex flex-wrap gap-4">
            {data.trustItems.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <Check className="size-4 text-green" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side (form) */}
        <div className="w-full max-w-md rounded-3xl bg-white p-12 text-text shadow-2xl">
          <h3 className="font-heading text-2xl font-bold text-navy">
            {data.formTitle}
          </h3>
          <p className="mt-2 text-sm text-text-muted">{data.formDescription}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Name field */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <Input
                type="text"
                placeholder="Imię i nazwisko"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            {/* Email field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <Input
                type="email"
                placeholder="Adres e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            {/* Phone field */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
              <Input
                type="tel"
                placeholder="Numer telefonu"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                required
              />
            </div>

            {/* Package field */}
            <div>
              <select
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-md border bg-transparent px-3 text-sm text-text shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                required
              >
                <option value="">Wybierz pakiet</option>
                {packageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Description field */}
            <div>
              <Textarea
                placeholder="Krótki opis problemu (opcjonalnie)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={600}
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-green font-semibold text-white shadow-md hover:bg-green-dark disabled:opacity-60"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  {data.formCta}
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>

            {/* Success message */}
            {submitted && (
              <p className="rounded-lg bg-green/10 px-4 py-3 text-center text-sm font-medium text-green-dark">
                Dziękujemy! Skontaktujemy się wkrótce.
              </p>
            )}

            {/* Error message */}
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                {error}
              </p>
            )}
          </form>

          {/* Disclaimer */}
          <p className="mt-4 text-center text-xs text-text-muted">
            {data.formDisclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
