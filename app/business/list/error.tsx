"use client";

import PageContainer from "@/components/page-container";
import { RenderErrorProps } from "@/types/error-props";

export default function Error({ reset }: RenderErrorProps) {
  return (
    <PageContainer className="flex flex-col gap-10 container mx-auto justify-center items-center">
      <h1 className="font-xl xl:font-2xl text-center">Something went wrong!</h1>
      <button className="btn-primary w-2xs" onClick={reset}>
        Click here to reset
      </button>
    </PageContainer>
  );
}
