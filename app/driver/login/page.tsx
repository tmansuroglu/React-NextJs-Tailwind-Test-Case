import type { Metadata } from "next";
import PageContainer from "@/components/page-container";
import EmptyPageContent from "@/components/EmptyPageContent";

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
