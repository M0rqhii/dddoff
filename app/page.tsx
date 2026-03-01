import { getContent } from "@/lib/content";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Clients from "@/components/sections/Clients";
import Pricing from "@/components/sections/Pricing";
import WhyUs from "@/components/sections/WhyUs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header />
      <Hero data={content.hero} />
      <Services data={content.services} />
      <Clients data={content.clients} />
      <Pricing firms={content.pricingFirms} individual={content.pricingIndividual} />
      <WhyUs data={content.whyUs} />
      <Contact data={content.contact} />
      <Footer data={content.footer} />
    </>
  );
}
