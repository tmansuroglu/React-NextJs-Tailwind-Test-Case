import EmptyPageContent from "@/components/empty-page-content";
import Main from "@/components/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumper UK - Driver Register Page",
};

export default function DriverRegisterPage() {
  return (
    <Main>
      <EmptyPageContent title="Driver Register Page" />
    </Main>
  );
}
