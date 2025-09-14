import EmptyPageContent from "@/components/empty-page-content";
import PageContainer from "@/components/page-container";
import type { Metadata } from "next";

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
