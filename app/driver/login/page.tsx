import type { Metadata } from "next";
import PageContainer from "../../_components/page-container";
import EmptyPageContent from "../../_components/empty-page-content";

export const metadata: Metadata = {
  title: "Bumper UK - Driver Login Page",
};

export default function DriverLoginPage() {
  return (
    <PageContainer>
      <EmptyPageContent title="Driver Login Page" />
    </PageContainer>
  );
}
