"use client";

import { redirect, RedirectType } from "next/navigation";
import PageContainer from "./_components/page-container";
import { Routes } from "./_types/enums";

export default function Error({}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageContainer className="flex flex-col gap-10 container mx-auto justify-center items-center">
      <h1 className="font-xl xl:font-2xl text-center">Something went wrong!</h1>
      <button
        className="btn-primary w-2xs"
        onClick={() => redirect(Routes.Business, RedirectType.replace)}
      >
        Go back to main page
      </button>
    </PageContainer>
  );
}
