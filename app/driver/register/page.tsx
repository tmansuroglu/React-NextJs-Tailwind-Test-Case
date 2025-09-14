import EmptyPageContent from "@/components/empty-page-content";
import PageContainer from "@/components/page-container";
import type { Metadata } from "next";

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
