import EmptyPageContent from "@/components/empty-page-content";
import Main from "@/components/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumper UK - Business Login Page",
};

export default function BusinessLoginPage() {
  return (
    <Main className="container mx-auto px-5">
      <EmptyPageContent title="Business Login Page" />
    </Main>
  );
}
