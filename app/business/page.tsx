import type { Metadata } from "next";
import SubHero from "./_components/sub-hero";
import Hero from "./_components/hero";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: "Bumper UK - Business Landing Page",
};

export default function BusinessPage() {
  return (
    <Main className="pt-0">
      <Hero />
      <SubHero />
    </Main>
  );
}
