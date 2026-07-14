import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/Hero";
import { Features } from "@/app/components/sections/Features";
import { Pricing } from "@/app/components/sections/Pricing";
import { FAQ } from "@/app/components/sections/FAQ";
import { ScrollAirplane } from "@/app/components/ui/ScrollAirplane";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ScrollAirplane>
          <Hero />
          <Features />
        </ScrollAirplane>
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
