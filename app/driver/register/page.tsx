import type { Metadata } from "next";
import PageContainer from "../../_components/page-container";
import EmptyPageContent from "../../_components/empty-page-content";

export const metadata: Metadata = {
  title: "Bumper UK - Driver Register Page",
};

export default function DriverRegisterPage() {
  return (
    <PageContainer>
      <EmptyPageContent title="Driver Register Page" />
    </PageContainer>
  );
}
