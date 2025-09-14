import EmptyPageContent from "@/components/empty-page-content";
import PageContainer from "@/components/page-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumper UK - Business Login Page",
};

export default function BusinessLoginPage() {
  return (
    <PageContainer className="container mx-auto px-5">
      <EmptyPageContent title="Business Login Page" />
    </PageContainer>
  );
}
