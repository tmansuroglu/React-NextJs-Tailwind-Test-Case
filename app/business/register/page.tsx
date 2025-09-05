"use client";

import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../types/enums";
import {
  FormValues,
  RegisterBusinessFormFields,
  useFormProps,
} from "./page.utils";
import { FormProvider, SubmitHandler } from "react-hook-form";
import FormTextInput from "../../components/form-text-input";
import FormCheckboxInput from "../../components/form-checkbox-input";

// TODO: missing meta data
// export const metadata: Metadata = {
//   title: "Bumper UK - Business Register Page",
// };

const LABEL_CLASS_NAME = "flex gap-1.5 items-center";

export default function BusinessRegisterPage() {
  const formProps = useFormProps();

  const onSubmit: SubmitHandler<FormValues> = (values, e) => {
    e?.preventDefault();
    // TODO: add handler
    console.log("values", values);
  };

  const { handleSubmit, formState, setValue, trigger } = formProps;
  const { isDirty, isValid, errors } = formState;

  const payError = errors[RegisterBusinessFormFields.PayLater]?.message;

  const isSubmitDisabled = !isDirty || !isValid;

  return (
    <main className="bg-brand-primary-blue -mt-24 pt-30 pb-8">
      <Link href="-1" className="inline-block p-4 mb-2">
        <Image
          src="/back-arrow.svg"
          alt="back navigation button"
          width={20}
          height={20}
        />
      </Link>
      <div className="container mx-auto px-4">
        <h1 className="font-lg text-brand-primary-white mb-2">
          Join our network
        </h1>
        <p className="text-brand-primary-white font-sm mb-8">
          Offer <strong>PayLater</strong> to split servicing and repair work
          into monthly instalments - interest-free. Use PayNow to take secure
          payments online.
        </p>

        <div className="bg-brand-primary-white rounded-[30px] px-4 py-6 border-[1px] border-brand-secondary-black">
          <h2 className="font-sm-bold text-brand-primary-black mb-1">
            Join our network
          </h2>
          <p className="font-sm text-brand-primary-black mb-5">
            Free to join, no monthly fees
          </p>
          <FormProvider {...formProps}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-8">
                <FormTextInput
                  InputProps={{ name: RegisterBusinessFormFields.Name }}
                  LabelProps={{
                    className: LABEL_CLASS_NAME,
                    children: (
                      <>
                        <Image
                          src="/person.svg"
                          height={19}
                          width={16}
                          alt="person icon"
                          className="w-auto h-auto"
                        />
                        <span>Name</span>
                      </>
                    ),
                  }}
                />
                <FormTextInput
                  InputProps={{ name: RegisterBusinessFormFields.Company }}
                  LabelProps={{
                    className: LABEL_CLASS_NAME,
                    children: (
                      <>
                        <Image
                          src="/building.svg"
                          height={19}
                          width={16}
                          alt="building icon"
                          className="w-auto h-auto"
                        />
                        <span>Company</span>
                      </>
                    ),
                  }}
                />
                <FormTextInput
                  InputProps={{ name: RegisterBusinessFormFields.MobilePhone }}
                  LabelProps={{
                    className: LABEL_CLASS_NAME,
                    children: (
                      <>
                        <Image
                          src="/phone.svg"
                          height={19}
                          width={16}
                          className="w-auto h-auto"
                          alt="phone icon"
                        />
                        <span>Mobile Phone Number</span>
                      </>
                    ),
                  }}
                />
                <FormTextInput
                  InputProps={{
                    type: "email",
                    name: RegisterBusinessFormFields.Email,
                  }}
                  LabelProps={{
                    className: LABEL_CLASS_NAME,
                    children: (
                      <>
                        <Image
                          src="/mail.svg"
                          height={19}
                          width={16}
                          alt="mail icon"
                          className="w-auto h-auto"
                        />
                        <span>Email Address</span>
                      </>
                    ),
                  }}
                />
                <div>
                  <p className={LABEL_CLASS_NAME}>
                    <Image
                      src="/wrench.svg"
                      height={19}
                      width={16}
                      alt="wrench icon"
                      className="w-auto h-auto"
                    />
                    <span>What services are you interested in?</span>
                  </p>
                  <p className="font-xs text-brand-tertiary-gray">
                    Please select the services you&apos;re interested in
                    offering your customers
                  </p>
                  <div className="flex flex-row gap-3 w-full relative mt-2">
                    <FormCheckboxInput
                      hideErrorText
                      LabelProps={{
                        children: "PayLater",
                      }}
                      InputProps={{
                        name: RegisterBusinessFormFields.PayLater,
                        onChange: (e) => {
                          setValue(
                            RegisterBusinessFormFields.PayLater,
                            e.target.checked,
                            {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            }
                          );

                          trigger(RegisterBusinessFormFields.PayNow);
                        },
                      }}
                    />
                    <FormCheckboxInput
                      hideErrorText
                      LabelProps={{
                        children: "PayNow",
                      }}
                      InputProps={{
                        name: RegisterBusinessFormFields.PayNow,
                        onChange: (e) => {
                          setValue(
                            RegisterBusinessFormFields.PayNow,
                            e.target.checked,
                            {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            }
                          );

                          trigger(RegisterBusinessFormFields.PayLater);
                        },
                      }}
                    />
                  </div>
                  {!!payError && (
                    <div className="text-error font-xxs mt-2">{payError}</div>
                  )}
                </div>

                <div>
                  <button
                    className="btn-primary-over-rounded font-sm xl:font-sm-medium flex gap-2.5 w-full justify-center mb-5"
                    type="submit"
                    aria-label="Register your interest with Bumper"
                    disabled={isSubmitDisabled}
                  >
                    <span>Register</span>
                    <Image
                      src="/arrow.svg"
                      width={16}
                      height={19}
                      alt=""
                      aria-hidden="true"
                      className="w-auto h-auto"
                    />
                  </button>
                  <p className="flex items-center gap-1 font-sm text-brand-primary-black justify-center">
                    Already registered?
                    <Link
                      className="text-brand-primary-green hover:underline"
                      href={`${Routes.Business}${Routes.Login}`}
                      aria-label="Log in to your Bumper account"
                    >
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
