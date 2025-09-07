"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { z } from "zod";
import { Routes } from "../../types/enums";
import { RegisterBusinessRequestPayload } from "../../types/payload";

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

const alphaNumericString = z
  .string()
  .min(1, REQUIRED)
  .regex(/^[a-zA-Z0-9]+$/, "Must be alphanumeric");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
    [RegisterBusinessFormFields.PostCode]: alphaNumericString.max(
      30,
      "Postcode must not exceed 30 characters"
    ),
    [RegisterBusinessFormFields.PayLater]: z.boolean(),
    [RegisterBusinessFormFields.PayNow]: z.boolean(),
  })
  .refine(
    (data) =>
      data[RegisterBusinessFormFields.PayLater] ||
      data[RegisterBusinessFormFields.PayNow],
    {
      path: [RegisterBusinessFormFields.PayLater],
      message:
        "At least one payment option (Pay Later or Pay Now) must be selected",
    }
  )
  .refine(
    (data) =>
      data[RegisterBusinessFormFields.PayLater] ||
      data[RegisterBusinessFormFields.PayNow],
    {
      path: [RegisterBusinessFormFields.PayNow],
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
  [RegisterBusinessFormFields.PayLater]: false,
  [RegisterBusinessFormFields.PayNow]: false,
  [RegisterBusinessFormFields.PostCode]: "",
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
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const useEventHandlers = ({
  setValue,
  trigger,
  setIsLoading,
}: UseEventHandlersOptions) => {
  const handleOnSubmit: SubmitHandler<FormValues> = async (values, e) => {
    try {
      e?.preventDefault();
      setIsLoading(true);

      const payload: RegisterBusinessRequestPayload = {
        name: values[RegisterBusinessFormFields.Name],
        company: values[RegisterBusinessFormFields.Company],
        mobile_phone: values[RegisterBusinessFormFields.MobilePhone],
        email_address: values[RegisterBusinessFormFields.Email],
        postcode: values[RegisterBusinessFormFields.PostCode],
        pay_later: values[RegisterBusinessFormFields.PayLater],
        pay_now: values[RegisterBusinessFormFields.PayNow],
      };

      await fetch("/api/business/register", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      setIsLoading(false);
      return alert("Failed to register the business");
    }
    redirect(Routes.BusinessList);
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

export const POST_CODES = [
  { value: "N61BA" },
  { value: "E17AA" },
  { value: "SW1A1AA" },
  { value: "M11AE" },
  { value: "B11BB" },
  { value: "L18JQ" },
  { value: "G11AB" },
  { value: "EH11YZ" },
];
