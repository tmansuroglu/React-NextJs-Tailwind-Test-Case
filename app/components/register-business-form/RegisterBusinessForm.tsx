"use client";

import { FormProvider } from "react-hook-form";
import FormTextInput from "../form-text-input";
import LabeledIcon from "../labeled-icon";
import {
  POST_CODES,
  RegisterBusinessFormFields,
  useEventHandlers,
  useFormProps,
} from "./RegisterBusinessForm.utils";
import FormAutoCompleteComboBox from "../form-auto-complete-combo-box";
import FormCheckboxInput from "../form-checkbox-input";
import LoadingIndicator from "../loading-indicator";
import Link from "next/link";
import { Routes } from "../../types/enums";
import Arrow from "../../../public/arrow.svg";

export function RegisterBusinessForm() {
  const formProps = useFormProps();

  const { handleSubmit, formState, setValue, trigger } = formProps;
  const { errors } = formState;

  const payError = errors[RegisterBusinessFormFields.PayLater]?.message;

  const {
    handleOnSubmit,
    handlePayLaterChange,
    handlePayNowChange,
    isLoading,
  } = useEventHandlers({ setValue, trigger });

  return (
    <FormProvider {...formProps}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="flex flex-col gap-8">
          <FormTextInput
            name={RegisterBusinessFormFields.Name}
            disabled={isLoading}
            label={
              <LabeledIcon
                src="/person.svg"
                alt="person icon"
                label="Name"
                unoptimized
              />
            }
          />
          <FormTextInput
            name={RegisterBusinessFormFields.Company}
            disabled={isLoading}
            label={
              <LabeledIcon
                src="/building.svg"
                alt="building icon"
                label="Company"
                unoptimized
              />
            }
          />
          <FormTextInput
            disabled={isLoading}
            name={RegisterBusinessFormFields.MobilePhone}
            label={
              <LabeledIcon
                src="/phone.svg"
                alt="phone icon"
                label="Mobile Phone Number"
                unoptimized
              />
            }
          />
          <FormTextInput
            disabled={isLoading}
            name={RegisterBusinessFormFields.Email}
            type="email"
            label={
              <LabeledIcon
                src="/mail.svg"
                alt="mail icon"
                label="Email Address"
                unoptimized
              />
            }
          />
          <FormAutoCompleteComboBox
            InputProps={{
              disabled: isLoading,
              placeholder: "Start typing to match your address",
            }}
            name={RegisterBusinessFormFields.PostCode}
            items={POST_CODES}
            LabelProps={{ className: "flex gap-1.5 items-center" }}
            label={
              <LabeledIcon
                src="/house.svg"
                alt="mail icon"
                label="Postcode"
                unoptimized
              />
            }
          />
          <fieldset>
            <LabeledIcon
              src="/wrench.svg"
              alt="wrench icon"
              unoptimized
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
                disabled={isLoading}
                label="PayLater"
                name={RegisterBusinessFormFields.PayLater}
                ariaDescribedBy="pay-error"
                onChange={handlePayLaterChange}
              />
              <FormCheckboxInput
                disabled={isLoading}
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
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading && <LoadingIndicator aria-live="polite" />}
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
