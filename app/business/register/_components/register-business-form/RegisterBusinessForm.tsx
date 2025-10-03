"use client";

import { FormProvider } from "react-hook-form";
import {
  POST_CODES,
  useEventHandlers,
  useFormProps,
} from "./RegisterBusinessForm.utils";
import Link from "next/link";
import Arrow from "@/public/arrow.svg";
import Person from "@/public/person.svg";
import Building from "@/public/building.svg";
import Phone from "@/public/phone.svg";
import House from "@/public/house.svg";
import Mail from "@/public/mail.svg";
import Wrench from "@/public/wrench.svg";
import { RegisterBusinessFormFields, Routes } from "@/types/enums";
import FormTextInput from "@/form-components/form-text-input";
import LabeledIcon from "@/components/labeled-icon";
import FormAutoCompleteComboBox from "@/form-components/form-auto-complete-combo-box";
import FormCheckboxInput from "@/form-components/form-checkbox-input";
import LoadingIndicator from "@/components/loading-indicator";
import { useActionState, useId } from "react";
import ErrorText from "@/components/error-text";
import Form from "next/form";
import FormPhoneInput from "@/form-components/form-phone-input";

export function RegisterBusinessForm() {
  const submitErrorId = useId();
  const payErrorId = useId();
  const formProps = useFormProps();

  const { formState, setValue, trigger } = formProps;
  const { errors } = formState;

  const payError =
    errors[RegisterBusinessFormFields.PayLater]?.message ||
    errors[RegisterBusinessFormFields.PayNow]?.message;

  const {
    handleOnSubmit: handleOnSubmitAction,
    handlePayLaterChange,
    handlePayNowChange,
  } = useEventHandlers({ setValue, trigger });

  const [state, formAction, isPending] = useActionState(handleOnSubmitAction, {
    success: true,
    message: "",
  });

  return (
    <FormProvider {...formProps}>
      <Form action={formAction}>
        <div className="flex flex-col gap-8">
          <FormTextInput
            aria-required
            name={RegisterBusinessFormFields.Name}
            disabled={isPending}
            label={
              <LabeledIcon
                label="Name"
                IconComponent={Person}
                IconComponentProps={{
                  "data-testid": "person-icon",
                }}
              />
            }
          />
          <FormTextInput
            aria-required
            name={RegisterBusinessFormFields.Company}
            disabled={isPending}
            label={
              <LabeledIcon
                IconComponent={Building}
                label="Company"
                IconComponentProps={{
                  "data-testid": "building-icon",
                }}
              />
            }
          />
          <FormPhoneInput
            aria-required
            disabled={isPending}
            name={RegisterBusinessFormFields.MobilePhone}
            label={
              <LabeledIcon
                IconComponent={Phone}
                label="Mobile Phone Number"
                IconComponentProps={{
                  "data-testid": "phone-icon",
                }}
              />
            }
            defaultCountry="gb"
            forceDialCode
            hideDropdown
          />
          <FormTextInput
            aria-required
            disabled={isPending}
            name={RegisterBusinessFormFields.Email}
            type="email"
            label={
              <LabeledIcon
                IconComponent={Mail}
                label="Email Address"
                IconComponentProps={{
                  "data-testid": "mail-icon",
                }}
              />
            }
          />
          <FormAutoCompleteComboBox
            InputProps={{
              "aria-required": true,
              disabled: isPending,
              placeholder: "Start typing to match your address",
            }}
            name={RegisterBusinessFormFields.PostCode}
            items={POST_CODES}
            LabelProps={{ className: "flex gap-1.5 items-center" }}
            label={
              <LabeledIcon
                IconComponent={House}
                label="Postcode"
                IconComponentProps={{
                  "data-testid": "house-icon",
                }}
              />
            }
          />
          <fieldset>
            <LabeledIcon
              IconComponent={Wrench}
              IconComponentProps={{
                "data-testid": "wrench-icon",
              }}
              label={
                <legend className="font-sm-bold">
                  What services are you interested in?
                </legend>
              }
            />
            <p className="font-xs text-brand-tertiary-gray">
              Please select the services you&apos;re interested in offering your
              customers
            </p>
            <div className="flex flex-row gap-3 w-full relative mt-2">
              <FormCheckboxInput
                hideErrorText
                disabled={isPending}
                label="PayLater"
                name={RegisterBusinessFormFields.PayLater}
                aria-describedby={payErrorId}
                onChange={handlePayLaterChange}
              />
              <FormCheckboxInput
                disabled={isPending}
                hideErrorText
                label="PayNow"
                aria-describedby={payErrorId}
                name={RegisterBusinessFormFields.PayNow}
                onChange={handlePayNowChange}
              />
            </div>
            {!!payError && (
              <ErrorText id={payErrorId} className="mt-2">
                {payError}
              </ErrorText>
            )}
          </fieldset>
          <div className="flex gap-5 flex-col">
            <button
              className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-full justify-center items-center"
              type="submit"
              aria-label="Register your interest with Bumper"
              disabled={isPending}
              aria-disabled={isPending}
              aria-describedby={submitErrorId}
            >
              {isPending && (
                <LoadingIndicator
                  aria-live="polite"
                  LoaderProps={{ className: "size-5" }}
                />
              )}
              <span>Register</span>
              <Arrow
                aria-hidden
                width={20}
                height={20}
                data-testid="arrow-icon"
              />
            </button>
            {!state.success && (
              <ErrorText className="text-center w-full" id={submitErrorId}>
                {state.message}
              </ErrorText>
            )}
            <p className="flex items-center gap-1 font-sm text-brand-primary-black justify-center">
              Already registered?
              <Link
                className="text-brand-primary-green hover:underline"
                href={Routes.BusinessLogin}
                aria-label="Log in to your Bumper account"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
