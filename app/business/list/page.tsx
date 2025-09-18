import PageContainer from "@/components/page-container";
import { SearchParamsType } from "@/types/search-param-type";
import type { Metadata } from "next";
import { Suspense } from "react";
import BusinessSearchInput from "./_components/business-search-Input";
import BusinessList from "./_components/business-list";
import LoadingIndicator from "@/components/loading-indicator";
import { SearchParamKeys } from "@/types/enums";

export const metadata: Metadata = {
  title: "Bumper UK - Business List Page",
};

type ListPageProps = {
  searchParams: Promise<SearchParamsType>;
};
export default async function ListPage({ searchParams }: ListPageProps) {
  const params = await searchParams;

  return (
    <PageContainer className="bg-brand-primary-blue flex">
      <div className="container mx-auto mt-11.5 px-4 flex flex-col flex-1">
        <h1 className="text-brand-primary-white font-lg xl:font-xl-plus mb-2 xl:mb-5">
          Interested Dealerships
        </h1>
        <Suspense
          key={params[SearchParamKeys.CompanyName] as string | undefined}
          fallback={
            <LoadingIndicator
              className="flex-1"
              LoaderProps={{
                className: "size-20",
              }}
            />
          }
        >
          <section className="p-8 border rounded-4xl bg-brand-primary-white w-full mb-4">
            <BusinessSearchInput />
          </section>
          <section className="w-full gap-4 flex flex-col flex-1">
            <BusinessList searchParams={params} />
          </section>
        </Suspense>
      </div>
    </PageContainer>
  );
}
