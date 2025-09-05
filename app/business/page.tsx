import type { Metadata } from "next";
import Hero from "../components/hero";

export const metadata: Metadata = {
  title: "Bumper UK - Business Landing Page",
};

export default function BusinessPage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
