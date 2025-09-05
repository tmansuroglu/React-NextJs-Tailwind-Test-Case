"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEventHandler } from "react";
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { z } from "zod";

const REQUIRED = "Required";

export enum RegisterBusinessFormFields {
  Name = "name",
  Company = "company",
  MobilePhone = "mobilePhone",
  Email = "email",
  PostCode = "postCode",
  PayLater = "payLater",
  PayNow = "payNow",
}

// Custom validation for alphanumeric strings
const alphaNumericString = z
  .string()
  .min(1, REQUIRED)
  .regex(/^[a-zA-Z0-9]+$/, "Must be alphanumeric");

// Email regex (standard email format)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Mobile phone regex: UK mobile number starting with 07 followed by 9 digits
const mobilePhoneRegex = /^0(\s*)(7)(\s*)(\d(\s*)){9}$/;

const validationSchema = z
  .object({
    [RegisterBusinessFormFields.Name]: alphaNumericString.max(
      255,
      "Name must not exceed 255 characters"
    ),
    [RegisterBusinessFormFields.Company]: z
      .string()
      .min(1, REQUIRED)
      .max(255, "Company must not exceed 255 characters"),
    [RegisterBusinessFormFields.MobilePhone]: z
      .string()
      .regex(
        mobilePhoneRegex,
        "Mobile phone must be a valid UK number (e.g., 07700900123)"
      )
      .max(15, "Mobile phone must not exceed 15 characters"),
    [RegisterBusinessFormFields.Email]: z
      .email()
      .min(5, "Email must be at least 5 characters")
      .max(255, "Email must not exceed 255 characters")
      .regex(emailRegex, "Invalid email format"),
    // TODO: missing fields
    // [RegisterBusinessFormFields.PostCode]: alphaNumericString.max(
    //   30,
    //   "Postcode must not exceed 30 characters"
    // ),
    [RegisterBusinessFormFields.PayLater]: z.boolean(),
    [RegisterBusinessFormFields.PayNow]: z.boolean(),
  })
  .refine(
    (data) =>
      data[RegisterBusinessFormFields.PayLater] ||
      data[RegisterBusinessFormFields.PayNow],
    {
      path: [RegisterBusinessFormFields.PayLater], // Applies error at the root level or can target a specific field
      message:
        "At least one payment option (Pay Later or Pay Now) must be selected",
    }
  )
  .refine(
    (data) =>
      data[RegisterBusinessFormFields.PayLater] ||
      data[RegisterBusinessFormFields.PayNow],
    {
      path: [RegisterBusinessFormFields.PayNow], // Applies error at the root level or can target a specific field
      message:
        "At least one payment option (Pay Later or Pay Now) must be selected",
    }
  );

export type FormValues = z.infer<typeof validationSchema>;

const DEFAULT_VALUES: DefaultValues<FormValues> = {
  [RegisterBusinessFormFields.Name]: "",
  [RegisterBusinessFormFields.Company]: "",
  [RegisterBusinessFormFields.Email]: "",
  [RegisterBusinessFormFields.MobilePhone]: "",
  // TODO: missing fields
  [RegisterBusinessFormFields.PayLater]: false,
  [RegisterBusinessFormFields.PayNow]: false,
  // [RegisterBusinessFormFields.PostCode]: "",
};

export const useFormProps = () =>
  useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

type UseEventHandlersOptions = {
  setValue: UseFormSetValue<FormValues>;
  trigger: UseFormTrigger<FormValues>;
};

export const useEventHandlers = ({
  setValue,
  trigger,
}: UseEventHandlersOptions) => {
  const handleOnSubmit: SubmitHandler<FormValues> = (values, e) => {
    e?.preventDefault();
    // TODO: add handler
    console.log("values", values);
  };

  const handlePayLaterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(RegisterBusinessFormFields.PayLater, e.target.checked, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    trigger(RegisterBusinessFormFields.PayNow);
  };
  const handlePayNowChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(RegisterBusinessFormFields.PayNow, e.target.checked, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    trigger(RegisterBusinessFormFields.PayLater);
  };

  return { handleOnSubmit, handlePayNowChange, handlePayLaterChange };
};
