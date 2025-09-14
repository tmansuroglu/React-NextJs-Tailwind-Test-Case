"use client";

import { RegisterBusinessRequestPayload } from "@/types/payload";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEventHandler, useTransition } from "react";
import {
  DefaultValues,
  SubmitHandler,
  useForm,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { z } from "zod";
import { RegisterBusinessFormFields } from "@/types/enums";
import { businessRegisterValidationSchema } from "@/utils/business-register-validation-schema";
import registerBusiness from "@/actions/register-business";

export type RegisterBusinessFormValues = z.infer<
  typeof businessRegisterValidationSchema
>;

const DEFAULT_VALUES: DefaultValues<RegisterBusinessFormValues> = {
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
  const [isPending, startTransition] = useTransition();

  const handleOnSubmit: SubmitHandler<RegisterBusinessFormValues> = async (
    values
  ) => {
    const payload: RegisterBusinessRequestPayload = {
      name: values[RegisterBusinessFormFields.Name],
      company: values[RegisterBusinessFormFields.Company],
      mobile_phone: values[RegisterBusinessFormFields.MobilePhone],
      email_address: values[RegisterBusinessFormFields.Email],
      postcode: values[RegisterBusinessFormFields.PostCode],
      pay_later: Boolean(values[RegisterBusinessFormFields.PayLater]),
      pay_now: Boolean(values[RegisterBusinessFormFields.PayNow]),
    };

    await registerBusiness(payload);
  };

  const transitionWrappedHandleSubmit: SubmitHandler<
    RegisterBusinessFormValues
  > = (values) => {
    startTransition(() => {
      handleOnSubmit(values);
    });
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
    transitionWrappedHandleSubmit,
    handlePayNowChange,
    handlePayLaterChange,
    isPending,
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
