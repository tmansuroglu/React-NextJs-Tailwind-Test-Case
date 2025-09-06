import { redirect, RedirectType } from "next/navigation";
import { Routes } from "./types/enums";

export default function Home() {
  redirect(Routes.Business, RedirectType.replace);
}
