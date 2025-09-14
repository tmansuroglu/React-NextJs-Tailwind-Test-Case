"use client";

import { Routes } from "@/types/enums";
import { redirect, RedirectType } from "next/navigation";

type EmptyPageContentProps = {
  title: string;
};
export function EmptyPageContent({ title }: EmptyPageContentProps) {
  return (
    <main className="text-center flex justify-center flex-col gap-5 pt-5">
      <h1>{title}</h1>
      <p>This page is out of scope of this project.</p>
      <p> Use the buttons below to visit the developed pages.</p>
      <div className="flex gap-5 justify-center">
        <button
          className="btn-primary"
          onClick={() => redirect(Routes.Business, RedirectType.push)}
        >
          Business Landing Page
        </button>
        <button
          className="btn-primary"
          onClick={() => redirect(Routes.BusinessRegister, RedirectType.push)}
        >
          Business Register Page
        </button>
        <button
          className="btn-primary"
          onClick={() => redirect(Routes.BusinessList, RedirectType.push)}
        >
          Business List Page
        </button>
      </div>
    </main>
  );
}
