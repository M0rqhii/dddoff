import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Polityka prywatności | DDDoff",
  description:
    "Polityka prywatności serwisu DDDoff. Informacje o przetwarzaniu danych osobowych zgodnie z RODO.",
};

export default async function PrivacyPolicyPage() {
  const content = await getContent();
  const { privacyPolicy } = content;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-light px-5 py-12">
        <article className="mx-auto max-w-3xl rounded-2xl bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <Link
            href="/"
            className="text-sm font-medium text-navy transition-colors hover:text-green"
          >
            ← Strona główna
          </Link>

          <h1 className="mt-4 font-heading text-3xl font-extrabold text-navy lg:text-4xl">
            {privacyPolicy.title}
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Ostatnia aktualizacja: {privacyPolicy.lastUpdated}
          </p>

          <div className="mt-10 space-y-8">
            {privacyPolicy.sections.map((section, i) => (
              <section key={`${section.heading}-${i}`}>
                <h2 className="font-heading text-xl font-bold text-navy">
                  {section.heading}
                </h2>
                <div className="mt-3 whitespace-pre-line leading-relaxed text-text">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer data={content.footer} />
    </>
  );
}
