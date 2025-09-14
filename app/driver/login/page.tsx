import EmptyPageContent from "@/components/empty-page-content";
import PageContainer from "@/components/page-container";
import type { Metadata } from "next";

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
