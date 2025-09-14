import type { Metadata } from "next";
import PageContainer from "../../_components/page-container";
import EmptyPageContent from "../../_components/empty-page-content";

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
