"use client";

import { FormProvider } from "react-hook-form";
import {
  POST_CODES,
  useEventHandlers,
  useFormProps,
} from "./RegisterBusinessForm.utils";
import Link from "next/link";
import { RegisterBusinessFormFields, Routes } from "../../../../_types/enums";
import Arrow from "@/public/arrow.svg";
import Person from "@/public/person.svg";
import Building from "@/public/building.svg";
import Phone from "@/public/phone.svg";
import House from "@/public/house.svg";
import Mail from "@/public/mail.svg";
import Wrench from "@/public/wrench.svg";
import LabeledIcon from "../../../../_components/labeled-icon";
import LoadingIndicator from "../../../../_components/loading-indicator";
import FormTextInput from "../../../../_form-components/form-text-input";
import FormAutoCompleteComboBox from "../../../../_form-components/form-auto-complete-combo-box";
import FormCheckboxInput from "../../../../_form-components/form-checkbox-input";

export function RegisterBusinessForm() {
  const formProps = useFormProps();

  const { formState, setValue, trigger } = formProps;
  const { errors } = formState;

  const payError = errors[RegisterBusinessFormFields.PayLater]?.message;

  const {
    transitionWrappedHandleSubmit,
    handlePayLaterChange,
    handlePayNowChange,
    isPending,
  } = useEventHandlers({ setValue, trigger });

  return (
    <FormProvider {...formProps}>
      <form onSubmit={formProps.handleSubmit(transitionWrappedHandleSubmit)}>
        <div className="flex flex-col gap-8">
          <FormTextInput
            id={`${RegisterBusinessFormFields.Name}-id`}
            name={RegisterBusinessFormFields.Name}
            disabled={isPending}
            label={<LabeledIcon label="Name" IconComponent={Person} />}
          />
          <FormTextInput
            name={RegisterBusinessFormFields.Company}
            id={`${RegisterBusinessFormFields.Company}-id`}
            disabled={isPending}
            label={<LabeledIcon IconComponent={Building} label="Company" />}
          />
          <FormTextInput
            disabled={isPending}
            id={`${RegisterBusinessFormFields.MobilePhone}-id`}
            name={RegisterBusinessFormFields.MobilePhone}
            label={
              <LabeledIcon IconComponent={Phone} label="Mobile Phone Number" />
            }
          />
          <FormTextInput
            id={`${RegisterBusinessFormFields.Email}-id`}
            disabled={isPending}
            name={RegisterBusinessFormFields.Email}
            type="email"
            label={<LabeledIcon IconComponent={Mail} label="Email Address" />}
          />
          <FormAutoCompleteComboBox
            InputProps={{
              disabled: isPending,
              id: `${RegisterBusinessFormFields.PostCode}-id`,
              placeholder: "Start typing to match your address",
            }}
            name={RegisterBusinessFormFields.PostCode}
            items={POST_CODES}
            LabelProps={{ className: "flex gap-1.5 items-center" }}
            label={<LabeledIcon IconComponent={House} label="Postcode" />}
          />
          <fieldset>
            <LabeledIcon
              IconComponent={Wrench}
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
                id={`${RegisterBusinessFormFields.PayLater}-id`}
                hideErrorText
                disabled={isPending}
                label="PayLater"
                name={RegisterBusinessFormFields.PayLater}
                ariaDescribedBy="pay-error"
                onChange={handlePayLaterChange}
              />
              <FormCheckboxInput
                id={`${RegisterBusinessFormFields.PayNow}-id`}
                disabled={isPending}
                hideErrorText
                label="PayNow"
                ariaDescribedBy="pay-error"
                name={RegisterBusinessFormFields.PayNow}
                onChange={handlePayNowChange}
              />
            </div>
            {!!payError && (
              <div id="pay-error" className="error-text mt-2">
                {payError}
              </div>
            )}
          </fieldset>
          <div>
            <button
              className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-full justify-center mb-5"
              type="submit"
              aria-label="Register your interest with Bumper"
              disabled={isPending}
              aria-disabled={isPending}
            >
              {isPending && <LoadingIndicator aria-live="polite" />}
              <span>Register</span>
              <Arrow aria-hidden="true" width={20} height={20} />
            </button>
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
      </form>
    </FormProvider>
  );
}
