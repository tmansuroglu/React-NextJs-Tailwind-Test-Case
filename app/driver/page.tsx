import EmptyPageContent from "@/components/empty-page-content";
import Main from "@/components/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumper UK - Driver Landing Page",
};

export default function DriverPage() {
  return (
    <Main>
      <EmptyPageContent title="For Drivers Page" />
    </Main>
  );
}
