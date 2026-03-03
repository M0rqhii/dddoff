"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CookieConsentContent } from "@/lib/types";

interface CookieConsentProps {
  data: CookieConsentContent;
}

export default function CookieConsent({ data }: CookieConsentProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem("cookie-consent");
  });

  function accept(type: "all" | "necessary") {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy p-4 shadow-2xl sm:p-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <p className="flex-1 text-sm leading-relaxed text-gray-300">
          {data.message}{" "}
          <Link
            href="/polityka-cookies"
            className="font-medium text-green-light underline underline-offset-2 hover:text-green"
          >
            {data.learnMore}
          </Link>
        </p>

        <div className="flex shrink-0 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => accept("necessary")}
            className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {data.acceptNecessary}
          </Button>
          <Button
            size="sm"
            onClick={() => accept("all")}
            className="bg-green font-semibold text-white hover:bg-green-dark"
          >
            {data.acceptAll}
          </Button>
        </div>
      </div>
    </div>
  );
}
