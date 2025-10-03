"use client";

import businessRegisterValidationSchema from "@/utils/business-register-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEventHandler } from "react";
import {
  DefaultValues,
  useForm,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { z } from "zod";
import { RegisterBusinessFormFields } from "@/types/enums";
import registerBusiness from "@/actions/register-business";
import {
  RegisterBusinessRequestPayload,
  RegisterBusinessResponsePayload,
} from "@/types/payload";

export type RegisterBusinessFormValues = z.infer<
  typeof businessRegisterValidationSchema
>;

export const DEFAULT_VALUES: DefaultValues<RegisterBusinessFormValues> = {
  [RegisterBusinessFormFields.Name]: "",
  [RegisterBusinessFormFields.Company]: "",
  [RegisterBusinessFormFields.Email]: "",
  [RegisterBusinessFormFields.MobilePhone]: "",
  [RegisterBusinessFormFields.PayLater]: false,
  [RegisterBusinessFormFields.PayNow]: false,
  [RegisterBusinessFormFields.PostCode]: "",
};

export const useFormProps = () =>
  useForm<RegisterBusinessFormValues>({
    resolver: zodResolver(businessRegisterValidationSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

type UseEventHandlersOptions = {
  setValue: UseFormSetValue<RegisterBusinessFormValues>;
  trigger: UseFormTrigger<RegisterBusinessFormValues>;
};

export const useEventHandlers = ({
  setValue,
  trigger,
}: UseEventHandlersOptions) => {
  const handleOnSubmit = async (
    currentState: RegisterBusinessResponsePayload,
    formData: FormData
  ): Promise<RegisterBusinessResponsePayload> => {
    const isFormValid = await trigger(undefined, { shouldFocus: true });

    if (!isFormValid) {
      return { message: "Failed to validate the form fields.", success: false };
    }

    const payload: RegisterBusinessRequestPayload = {
      name: formData.get(RegisterBusinessFormFields.Name)?.toString() ?? "",
      company:
        formData.get(RegisterBusinessFormFields.Company)?.toString() ?? "",
      mobile_phone:
        formData
          .get(RegisterBusinessFormFields.MobilePhone)
          ?.toString()
          .replaceAll(" ", "") ?? "",
      email_address:
        formData.get(RegisterBusinessFormFields.Email)?.toString() ?? "",
      postcode:
        formData.get(RegisterBusinessFormFields.PostCode)?.toString() ?? "",
      pay_later: formData.has(RegisterBusinessFormFields.PayLater),
      pay_now: formData.has(RegisterBusinessFormFields.PayNow),
    };

    return await registerBusiness(payload);
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

  return {
    handlePayNowChange,
    handlePayLaterChange,
    handleOnSubmit,
  };
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
