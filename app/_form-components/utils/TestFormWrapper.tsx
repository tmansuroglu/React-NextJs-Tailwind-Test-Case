/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import z from "zod";
import { FieldValues } from "react-hook-form";

type ResolverProps<S extends z.ZodType<any>> = {
  children: React.ReactNode;
  defaultValues?: Partial<z.infer<S>>;
  schema: S;
  onMethods?: (methods: UseFormReturn<z.infer<S>>) => void;
};

type NoResolverProps = {
  children: React.ReactNode;
  defaultValues?: Partial<FieldValues>;
  schema?: never;
  onMethods?: (methods: UseFormReturn<FieldValues>) => void;
};

export default function TestFormWrapper(
  props: ResolverProps<any> | NoResolverProps
) {
  const methods = useForm({
    defaultValues: props.defaultValues,
    mode: "onBlur",
    resolver: "schema" in props ? zodResolver(props.schema) : undefined,
  });

  useEffect(() => {
    props.onMethods?.(methods);
  }, [methods, props]);

  return <FormProvider {...methods}>{props.children}</FormProvider>;
}
