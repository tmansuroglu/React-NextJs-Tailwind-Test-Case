"use server";

import { Routes } from "@/types/enums";
import { RegisterBusinessRequestPayload } from "@/types/payload";
import { businessRegisterValidationSchema } from "@/utils/business-register-validation-schema";
import { redirect, RedirectType } from "next/navigation";
import { readBusinesses, writeBusinesses } from "../utils";
import { revalidatePath } from "next/cache";

export async function registerBusiness(
  payload: RegisterBusinessRequestPayload
) {
  try {
    businessRegisterValidationSchema.parse(payload);

    const newData = { ...payload, id: crypto.randomUUID() };

    const existingBusinesses = await readBusinesses();

    await writeBusinesses([newData, ...existingBusinesses]);

    revalidatePath(Routes.BusinessList);
  } catch (error) {
    // TODO: improve error handling
    console.log("register action error", error);
    throw new Error("Failed to register the business");
  } finally {
    redirect(Routes.BusinessList, RedirectType.push);
  }
}
