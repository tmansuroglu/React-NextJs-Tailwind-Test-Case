"use server";

import { Routes } from "../../_types/enums";
import { RegisterBusinessRequestPayload } from "../../_types/payload";
import { redirect, RedirectType } from "next/navigation";
import { readBusinesses, writeBusinesses } from "../utils";
import { revalidatePath } from "next/cache";
import businessRegisterValidationSchema from "../../_utils/business-register-validation-schema";

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
