"use server";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import businessRegisterValidationSchema from "@/utils/business-register-validation-schema";
import { readBusinesses, writeBusinesses } from "../utils";
import { RegisterBusinessRequestPayload } from "@/types/payload";
import { Routes } from "@/types/enums";

export async function registerBusiness(
  payload: RegisterBusinessRequestPayload
) {
  try {
    businessRegisterValidationSchema.parse(payload);

    const newData = { ...payload, id: crypto.randomUUID() };

    const existingBusinesses = await readBusinesses();

    await writeBusinesses([newData, ...existingBusinesses]);

    revalidatePath(Routes.BusinessList);
  } catch {
    return null;
  }
  redirect(Routes.BusinessList, RedirectType.push);
}
