import z from "zod";
import {
  alphaNumericRegex,
  emailRegex,
  mobilePhoneRegex,
} from "../regex/regex";
import { RegisterBusinessFormFields } from "@/types/enums";

const REQUIRED_MESSAGE = "Required";

const alphaNumericString = z
  .string()
  .min(1, REQUIRED_MESSAGE)
  .regex(alphaNumericRegex, "Must be alphanumeric");

export const businessRegisterValidationSchema = z
  .object({
    [RegisterBusinessFormFields.Name]: alphaNumericString.max(
      255,
      "Name must not exceed 255 characters"
    ),
    [RegisterBusinessFormFields.Company]: z
      .string()
      .min(1, REQUIRED_MESSAGE)
      .max(255, "Company must not exceed 255 characters"),
    [RegisterBusinessFormFields.MobilePhone]: z
      .string()
      .regex(
        mobilePhoneRegex,
        "Mobile phone must be a valid UK number (e.g., +44 7700 900123)"
      )
      .max(15, "Mobile phone must not exceed 15 characters"),
    [RegisterBusinessFormFields.Email]: z
      .email()
      .min(5, "Email must be at least 5 characters")
      .max(255, "Email must not exceed 255 characters")
      .regex(emailRegex, "Invalid email format"),
    [RegisterBusinessFormFields.PostCode]: alphaNumericString.max(
      30,
      "Postcode must not exceed 30 characters"
    ),
    [RegisterBusinessFormFields.PayLater]: z.boolean(),
    [RegisterBusinessFormFields.PayNow]: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      !data[RegisterBusinessFormFields.PayLater] &&
      !data[RegisterBusinessFormFields.PayNow]
    ) {
      ctx.addIssue({
        code: "custom",
        path: [RegisterBusinessFormFields.PayLater],
        message:
          "At least one payment option (Pay Later or Pay Now) must be selected",
      });

      ctx.addIssue({
        code: "custom",
        path: [RegisterBusinessFormFields.PayNow],
        message:
          "At least one payment option (Pay Later or Pay Now) must be selected",
      });
    }
  });
