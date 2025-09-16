"use client";

import PageContainer from "@/components/page-container";
import { RenderErrorProps } from "@/types/error-props";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({ reset }: RenderErrorProps) {
  const router = useRouter();
  return (
    <PageContainer className="flex flex-col gap-10 container mx-auto justify-center items-center">
      <h1 className="font-xl xl:font-2xl text-center">Something went wrong!</h1>
      <button
        className="btn-primary w-2xs"
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        Click here to refresh.
      </button>
    </PageContainer>
  );
}
