import type { Metadata } from "next";
import PageContainer from "@/components/page-container";
import EmptyPageContent from "@/components/EmptyPageContent";

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
