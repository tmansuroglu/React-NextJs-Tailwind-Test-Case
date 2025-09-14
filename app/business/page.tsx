import type { Metadata } from "next";
import PageContainer from "../_components/page-container";
import Hero from "./_components/hero";
import SubHero from "./_components/sub-hero";

export const metadata: Metadata = {
  title: "Bumper UK - Business Landing Page",
};

export default function BusinessPage() {
  return (
    <PageContainer className="pt-0">
      <Hero />
      <SubHero />
    </PageContainer>
  );
}
