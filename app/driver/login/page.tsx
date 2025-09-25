import EmptyPageContent from "@/components/empty-page-content";
import Main from "@/components/main";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bumper UK - Driver Login Page",
};

export default function DriverLoginPage() {
  return (
    <Main>
      <EmptyPageContent title="Driver Login Page" />
    </Main>
  );
}
