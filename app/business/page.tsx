import type { Metadata } from "next";
import Hero from "../components/hero";
import SubHero from "../components/sub-hero";

export const metadata: Metadata = {
  title: "Bumper UK - Business Landing Page",
};

export default function BusinessPage() {
  return (
    <main>
      <Hero />
      <SubHero />
    </main>
  );
}
