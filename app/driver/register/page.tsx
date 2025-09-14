import type { Metadata } from "next";
import PageContainer from "@/components/page-container";
import EmptyPageContent from "@/components/empty-page-content";

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
