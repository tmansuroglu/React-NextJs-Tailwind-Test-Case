import type { Metadata } from "next";
import Hero from "../components/hero";
import SubHero from "../components/sub-hero";
import PageContainer from "../components/page-container";

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
