import getBusinessList from "@/actions/get-business-list";
import LoadingIndicator from "@/components/loading-indicator";
import PageContainer from "@/components/page-container";
import { SearchParamsType } from "@/types/search-param-type";
import type { Metadata } from "next";
import { Suspense } from "react";
import BusinessSearchInput from "./_components/business-search-Input";
import BusinessList from "./_components/business-list";

export const metadata: Metadata = {
  title: "Bumper UK - Business List Page",
};

type ListPageProps = {
  searchParams: Promise<SearchParamsType>;
};
export default async function ListPage({ searchParams }: ListPageProps) {
  // TODO: needs suspense?
  const params = await searchParams;
  // TODO: what if move this inside the business list?
  const payload = await getBusinessList(params);

  return (
    <PageContainer className="bg-brand-primary-blue">
      <div className="container mx-auto mt-11.5 px-4">
        <h1 className="text-brand-primary-white font-lg xl:font-xl-plus mb-2 xl:mb-5">
          Interested Dealerships
        </h1>
        {/* TODO: This is random */}
        <Suspense fallback={<LoadingIndicator />}>
          <section className="p-8 border rounded-4xl bg-brand-primary-white w-full mb-4">
            <BusinessSearchInput />
          </section>
          <section className="w-full gap-4 flex flex-col">
            <BusinessList payload={payload} />
          </section>
        </Suspense>
      </div>
    </PageContainer>
  );
}
