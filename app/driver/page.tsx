import type { Metadata } from "next";
import PageContainer from "../_components/page-container";
import EmptyPageContent from "../_components/empty-page-content";

export const metadata: Metadata = {
  title: "Bumper UK - Driver Landing Page",
};

export default function DriverPage() {
  return (
    <PageContainer>
      <EmptyPageContent title="For Drivers Page" />
    </PageContainer>
  );
}
