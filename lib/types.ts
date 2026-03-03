export interface HeroStat {
  title: string;
  subtitle: string;
  icon: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cardTitle: string;
  stats: HeroStat[];
  cardCta: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface ServicesContent {
  badge: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface ClientCard {
  title: string;
  items: string[];
  cta: string;
}

export interface ClientsContent {
  badge: string;
  title: string;
  subtitle: string;
  firms: ClientCard;
  individual: ClientCard;
}

export interface PricingPlan {
  subtitle: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface PricingGroup {
  badge: string;
  plans: PricingPlan[];
  premiumItems?: string[];
}

export interface WhyUsItem {
  title: string;
  description: string;
  icon: string;
}

export interface WhyUsContent {
  badge: string;
  title: string;
  subtitle: string;
  items: WhyUsItem[];
}

export interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  sublabel: string;
  href?: string;
}

export interface ContactContent {
  badge: string;
  title: string;
  description: string;
  descriptionHighlight: string;
  methods: ContactMethod[];
  trustItems: string[];
  formTitle: string;
  formDescription: string;
  formCta: string;
  formDisclaimer: string;
}

export interface PolicySection {
  heading: string;
  body: string;
}

export interface PrivacyPolicyContent {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface CookiePolicyContent {
  title: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface CookieConsentContent {
  message: string;
  acceptAll: string;
  acceptNecessary: string;
  learnMore: string;
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterContent {
  about: string;
  quickLinks: { label: string; href: string }[];
  services: { label: string; href: string }[];
  socialLinks: FooterSocialLink[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  copyright: string;
}

export interface SiteContent {
  hero: HeroContent;
  services: ServicesContent;
  clients: ClientsContent;
  pricingFirms: PricingGroup;
  pricingIndividual: PricingGroup;
  whyUs: WhyUsContent;
  contact: ContactContent;
  footer: FooterContent;
  privacyPolicy: PrivacyPolicyContent;
  cookiePolicy: CookiePolicyContent;
  cookieConsent: CookieConsentContent;
}
