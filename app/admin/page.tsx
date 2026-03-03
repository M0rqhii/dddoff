"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { SiteContent } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch("/api/auth/check");
        const authData = await authRes.json();
        if (!authData.isLoggedIn) {
          router.push("/admin/login");
          return;
        }

        const contentRes = await fetch("/api/content");
        const contentData = await contentRes.json();
        setContent(contentData);
      } catch {
        toast.error("Błąd ładowania danych");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }, [router]);

  const handleSave = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        toast("Zapisano zmiany!");
      } else {
        toast.error("Błąd zapisu");
      }
    } catch {
      toast.error("Błąd zapisu");
    } finally {
      setSaving(false);
    }
  }, [content]);

  // Helper to update nested fields
  function updateField(path: string, value: string) {
    if (!content) return;
    setContent((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev)) as SiteContent;
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return clone;
    });
  }

  // Helper to update array item field
  function updateArrayField(path: string, index: number, field: string, value: string) {
    if (!content) return;
    setContent((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev)) as SiteContent;
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = clone;
      for (const key of keys) {
        obj = obj[key];
      }
      obj[index][field] = value;
      return clone;
    });
  }

  // Helper to update a string array (from textarea, split by newlines)
  function updateStringArray(path: string, value: string) {
    if (!content) return;
    setContent((prev) => {
      if (!prev) return prev;
      const clone = JSON.parse(JSON.stringify(prev)) as SiteContent;
      const keys = path.split(".");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value.split("\n").filter((line: string) => line.trim() !== "");
      return clone;
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-muted-foreground">Ładowanie...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-600">Nie udało się załadować treści.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight">Panel DDDoff</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Wyloguj
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Accordion type="multiple" className="space-y-2">
          {/* ===== HERO ===== */}
          <AccordionItem value="hero">
            <AccordionTrigger className="text-base font-semibold">
              Hero
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.hero.badge}
                  onChange={(e) => updateField("hero.badge", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.hero.title}
                  onChange={(e) => updateField("hero.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Wyróżnienie w tytule</Label>
                <Input
                  value={content.hero.titleHighlight}
                  onChange={(e) => updateField("hero.titleHighlight", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea
                  value={content.hero.description}
                  onChange={(e) => updateField("hero.description", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CTA Główny</Label>
                  <Input
                    value={content.hero.ctaPrimary}
                    onChange={(e) => updateField("hero.ctaPrimary", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Drugi</Label>
                  <Input
                    value={content.hero.ctaSecondary}
                    onChange={(e) => updateField("hero.ctaSecondary", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tytuł karty</Label>
                <Input
                  value={content.hero.cardTitle}
                  onChange={(e) => updateField("hero.cardTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA karty</Label>
                <Input
                  value={content.hero.cardCta}
                  onChange={(e) => updateField("hero.cardCta", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Statystyki</p>
              {content.hero.stats.map((stat, i) => (
                <Card key={i} className="py-3">
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Tytuł</Label>
                        <Input
                          value={stat.title}
                          onChange={(e) => updateArrayField("hero.stats", i, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Podtytuł</Label>
                        <Input
                          value={stat.subtitle}
                          onChange={(e) => updateArrayField("hero.stats", i, "subtitle", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Ikona</Label>
                        <Input
                          value={stat.icon}
                          onChange={(e) => updateArrayField("hero.stats", i, "icon", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* ===== USŁUGI ===== */}
          <AccordionItem value="services">
            <AccordionTrigger className="text-base font-semibold">
              Usługi
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.services.badge}
                  onChange={(e) => updateField("services.badge", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.services.title}
                  onChange={(e) => updateField("services.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Podtytuł</Label>
                <Input
                  value={content.services.subtitle}
                  onChange={(e) => updateField("services.subtitle", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Pozycje usług</p>
              {content.services.items.map((item, i) => (
                <Card key={i} className="py-3">
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Tytuł</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateArrayField("services.items", i, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Ikona</Label>
                        <Input
                          value={item.icon}
                          onChange={(e) => updateArrayField("services.items", i, "icon", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Opis</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateArrayField("services.items", i, "description", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* ===== KLIENCI ===== */}
          <AccordionItem value="clients">
            <AccordionTrigger className="text-base font-semibold">
              Klienci
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.clients.badge}
                  onChange={(e) => updateField("clients.badge", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.clients.title}
                  onChange={(e) => updateField("clients.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Podtytuł</Label>
                <Input
                  value={content.clients.subtitle}
                  onChange={(e) => updateField("clients.subtitle", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Dla Firm</p>
              <div className="space-y-2">
                <Label>Tytuł sekcji</Label>
                <Input
                  value={content.clients.firms.title}
                  onChange={(e) => updateField("clients.firms.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA</Label>
                <Input
                  value={content.clients.firms.cta}
                  onChange={(e) => updateField("clients.firms.cta", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pozycje (jedna na linię)</Label>
                <Textarea
                  value={content.clients.firms.items.join("\n")}
                  onChange={(e) => updateStringArray("clients.firms.items", e.target.value)}
                  rows={4}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Dla Klientów Indywidualnych</p>
              <div className="space-y-2">
                <Label>Tytuł sekcji</Label>
                <Input
                  value={content.clients.individual.title}
                  onChange={(e) => updateField("clients.individual.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA</Label>
                <Input
                  value={content.clients.individual.cta}
                  onChange={(e) => updateField("clients.individual.cta", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pozycje (jedna na linię)</Label>
                <Textarea
                  value={content.clients.individual.items.join("\n")}
                  onChange={(e) => updateStringArray("clients.individual.items", e.target.value)}
                  rows={4}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ===== CENNIK FIRMY ===== */}
          <AccordionItem value="pricingFirms">
            <AccordionTrigger className="text-base font-semibold">
              Cennik Firmy
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.pricingFirms.badge}
                  onChange={(e) => updateField("pricingFirms.badge", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Plany</p>
              {content.pricingFirms.plans.map((plan, i) => (
                <Card key={i} className="py-3">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Podtytuł</Label>
                        <Input
                          value={plan.subtitle}
                          onChange={(e) => updateArrayField("pricingFirms.plans", i, "subtitle", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Nazwa</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => updateArrayField("pricingFirms.plans", i, "name", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Cena</Label>
                        <Input
                          value={plan.price}
                          onChange={(e) => updateArrayField("pricingFirms.plans", i, "price", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Okres</Label>
                        <Input
                          value={plan.period}
                          onChange={(e) => updateArrayField("pricingFirms.plans", i, "period", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">CTA</Label>
                      <Input
                        value={plan.cta}
                        onChange={(e) => updateArrayField("pricingFirms.plans", i, "cta", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Cechy (jedna na linię)</Label>
                      <Textarea
                        value={plan.features.join("\n")}
                        onChange={(e) => updateStringArray(`pricingFirms.plans.${i}.features`, e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* ===== CENNIK INDYWIDUALNY ===== */}
          <AccordionItem value="pricingIndividual">
            <AccordionTrigger className="text-base font-semibold">
              Cennik Indywidualny
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.pricingIndividual.badge}
                  onChange={(e) => updateField("pricingIndividual.badge", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Plany</p>
              {content.pricingIndividual.plans.map((plan, i) => (
                <Card key={i} className="py-3">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Podtytuł</Label>
                        <Input
                          value={plan.subtitle}
                          onChange={(e) => updateArrayField("pricingIndividual.plans", i, "subtitle", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Nazwa</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => updateArrayField("pricingIndividual.plans", i, "name", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Cena</Label>
                        <Input
                          value={plan.price}
                          onChange={(e) => updateArrayField("pricingIndividual.plans", i, "price", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Okres</Label>
                        <Input
                          value={plan.period}
                          onChange={(e) => updateArrayField("pricingIndividual.plans", i, "period", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">CTA</Label>
                      <Input
                        value={plan.cta}
                        onChange={(e) => updateArrayField("pricingIndividual.plans", i, "cta", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Cechy (jedna na linię)</Label>
                      <Textarea
                        value={plan.features.join("\n")}
                        onChange={(e) => updateStringArray(`pricingIndividual.plans.${i}.features`, e.target.value)}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              {content.pricingIndividual.premiumItems && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Premium items (jedna na linię)</Label>
                    <Textarea
                      value={content.pricingIndividual.premiumItems.join("\n")}
                      onChange={(e) => updateStringArray("pricingIndividual.premiumItems", e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* ===== DLACZEGO MY ===== */}
          <AccordionItem value="whyUs">
            <AccordionTrigger className="text-base font-semibold">
              Dlaczego my
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.whyUs.badge}
                  onChange={(e) => updateField("whyUs.badge", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.whyUs.title}
                  onChange={(e) => updateField("whyUs.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Podtytuł</Label>
                <Input
                  value={content.whyUs.subtitle}
                  onChange={(e) => updateField("whyUs.subtitle", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Pozycje</p>
              {content.whyUs.items.map((item, i) => (
                <Card key={i} className="py-3">
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Tytuł</Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateArrayField("whyUs.items", i, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Ikona</Label>
                        <Input
                          value={item.icon}
                          onChange={(e) => updateArrayField("whyUs.items", i, "icon", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Opis</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateArrayField("whyUs.items", i, "description", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* ===== KONTAKT ===== */}
          <AccordionItem value="contact">
            <AccordionTrigger className="text-base font-semibold">
              Kontakt
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Badge</Label>
                <Input
                  value={content.contact.badge}
                  onChange={(e) => updateField("contact.badge", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.contact.title}
                  onChange={(e) => updateField("contact.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Opis</Label>
                <Textarea
                  value={content.contact.description}
                  onChange={(e) => updateField("contact.description", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Wyróżnienie w opisie</Label>
                <Input
                  value={content.contact.descriptionHighlight}
                  onChange={(e) => updateField("contact.descriptionHighlight", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Metody kontaktu</p>
              {content.contact.methods.map((method, i) => (
                <Card key={i} className="py-3">
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Ikona</Label>
                        <Input
                          value={method.icon}
                          onChange={(e) => updateArrayField("contact.methods", i, "icon", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Etykieta</Label>
                        <Input
                          value={method.label}
                          onChange={(e) => updateArrayField("contact.methods", i, "label", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Wartość</Label>
                        <Input
                          value={method.value}
                          onChange={(e) => updateArrayField("contact.methods", i, "value", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Podpis</Label>
                        <Input
                          value={method.sublabel}
                          onChange={(e) => updateArrayField("contact.methods", i, "sublabel", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Link (href)</Label>
                      <Input
                        value={method.href || ""}
                        onChange={(e) => updateArrayField("contact.methods", i, "href", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Separator />
              <div className="space-y-2">
                <Label>Zaufanie (jedna na linię)</Label>
                <Textarea
                  value={content.contact.trustItems.join("\n")}
                  onChange={(e) => updateStringArray("contact.trustItems", e.target.value)}
                  rows={3}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Formularz</p>
              <div className="space-y-2">
                <Label>Tytuł formularza</Label>
                <Input
                  value={content.contact.formTitle}
                  onChange={(e) => updateField("contact.formTitle", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Opis formularza</Label>
                <Textarea
                  value={content.contact.formDescription}
                  onChange={(e) => updateField("contact.formDescription", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA formularza</Label>
                <Input
                  value={content.contact.formCta}
                  onChange={(e) => updateField("contact.formCta", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Disclaimer formularza</Label>
                <Textarea
                  value={content.contact.formDisclaimer}
                  onChange={(e) => updateField("contact.formDisclaimer", e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ===== POLITYKA PRYWATNOŚCI ===== */}
          <AccordionItem value="privacyPolicy">
            <AccordionTrigger className="text-base font-semibold">
              Polityka prywatności
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.privacyPolicy.title}
                  onChange={(e) => updateField("privacyPolicy.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Data aktualizacji</Label>
                <Input
                  value={content.privacyPolicy.lastUpdated}
                  onChange={(e) => updateField("privacyPolicy.lastUpdated", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Sekcje</p>
              {content.privacyPolicy.sections.map((section, i) => (
                <Card key={i} className="py-3">
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Nagłówek</Label>
                      <Input
                        value={section.heading}
                        onChange={(e) => updateArrayField("privacyPolicy.sections", i, "heading", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Treść</Label>
                      <Textarea
                        value={section.body}
                        onChange={(e) => updateArrayField("privacyPolicy.sections", i, "body", e.target.value)}
                        rows={6}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* ===== POLITYKA COOKIES ===== */}
          <AccordionItem value="cookiePolicy">
            <AccordionTrigger className="text-base font-semibold">
              Polityka cookies
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tytuł</Label>
                <Input
                  value={content.cookiePolicy.title}
                  onChange={(e) => updateField("cookiePolicy.title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Data aktualizacji</Label>
                <Input
                  value={content.cookiePolicy.lastUpdated}
                  onChange={(e) => updateField("cookiePolicy.lastUpdated", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Sekcje</p>
              {content.cookiePolicy.sections.map((section, i) => (
                <Card key={i} className="py-3">
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Nagłówek</Label>
                      <Input
                        value={section.heading}
                        onChange={(e) => updateArrayField("cookiePolicy.sections", i, "heading", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Treść</Label>
                      <Textarea
                        value={section.body}
                        onChange={(e) => updateArrayField("cookiePolicy.sections", i, "body", e.target.value)}
                        rows={6}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* ===== ZGODA COOKIES ===== */}
          <AccordionItem value="cookieConsent">
            <AccordionTrigger className="text-base font-semibold">
              Baner cookie consent
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>Wiadomość</Label>
                <Textarea
                  value={content.cookieConsent.message}
                  onChange={(e) => updateField("cookieConsent.message", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Przycisk: Akceptuj wszystkie</Label>
                <Input
                  value={content.cookieConsent.acceptAll}
                  onChange={(e) => updateField("cookieConsent.acceptAll", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Przycisk: Tylko niezbędne</Label>
                <Input
                  value={content.cookieConsent.acceptNecessary}
                  onChange={(e) => updateField("cookieConsent.acceptNecessary", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Link: Dowiedz się więcej</Label>
                <Input
                  value={content.cookieConsent.learnMore}
                  onChange={(e) => updateField("cookieConsent.learnMore", e.target.value)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ===== STOPKA ===== */}
          <AccordionItem value="footer">
            <AccordionTrigger className="text-base font-semibold">
              Stopka
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-2">
                <Label>O nas</Label>
                <Textarea
                  value={content.footer.about}
                  onChange={(e) => updateField("footer.about", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Adres</Label>
                  <Input
                    value={content.footer.contactAddress}
                    onChange={(e) => updateField("footer.contactAddress", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input
                    value={content.footer.contactPhone}
                    onChange={(e) => updateField("footer.contactPhone", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={content.footer.contactEmail}
                    onChange={(e) => updateField("footer.contactEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Godziny</Label>
                  <Input
                    value={content.footer.contactHours}
                    onChange={(e) => updateField("footer.contactHours", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Copyright</Label>
                <Input
                  value={content.footer.copyright}
                  onChange={(e) => updateField("footer.copyright", e.target.value)}
                />
              </div>

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Social media</p>
              <p className="text-xs text-muted-foreground">
                Dostępne ikony: Facebook, Instagram, Linkedin
              </p>
              {content.footer.socialLinks.map((social, i) => (
                <Card key={i} className="py-3">
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Ikona</Label>
                        <Input
                          value={social.icon}
                          onChange={(e) => updateArrayField("footer.socialLinks", i, "icon", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Etykieta</Label>
                        <Input
                          value={social.label}
                          onChange={(e) => updateArrayField("footer.socialLinks", i, "label", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Link (href)</Label>
                        <Input
                          value={social.href}
                          onChange={(e) => updateArrayField("footer.socialLinks", i, "href", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Szybkie linki</p>
              {content.footer.quickLinks.map((link, i) => (
                <Card key={i} className="py-3">
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Etykieta</Label>
                        <Input
                          value={link.label}
                          onChange={(e) => updateArrayField("footer.quickLinks", i, "label", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Link (href)</Label>
                        <Input
                          value={link.href}
                          onChange={(e) => updateArrayField("footer.quickLinks", i, "href", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Separator />
              <p className="text-sm font-medium text-muted-foreground">Usługi w stopce</p>
              {content.footer.services.map((svc, i) => (
                <Card key={i} className="py-3">
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Etykieta</Label>
                        <Input
                          value={svc.label}
                          onChange={(e) => updateArrayField("footer.services", i, "label", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Link (href)</Label>
                        <Input
                          value={svc.href}
                          onChange={(e) => updateArrayField("footer.services", i, "href", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Save button */}
        <div className="sticky bottom-0 bg-slate-50 border-t py-4 mt-6">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#1e293b] hover:bg-[#1e293b]/90 text-white"
            size="lg"
          >
            {saving ? "Zapisywanie..." : "Zapisz zmiany"}
          </Button>
        </div>
      </main>
    </div>
  );
}
