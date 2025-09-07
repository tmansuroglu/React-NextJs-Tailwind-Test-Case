"use client";

import TextInput from "../../components/text-input";
import BusinessCard from "../../components/business-card";
import { useEffect, useState } from "react";
import { BusinessListResponsePayload } from "../../types/payload";
import { useSearchParams } from "next/navigation";
import { SearchParams } from "../../types/enums";
import LoadingIndicator from "../../components/loading-indicator";
import { useHandlers } from "./page.utils";
import LabeledIcon from "../../components/labeled-icon";

// TODO: add meta data

export default function ListPage() {
  const searchParams = useSearchParams();

  const companyNameParam = searchParams.get(SearchParams.CompanyName);

  const [inputValue, setInputValue] = useState(companyNameParam || "");

  const [payload, setPayload] = useState<BusinessListResponsePayload>();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);

  const isDataExist = Number(payload?.pagination.totalItems) > 0;

  const isMoreItemsExist =
    Number(payload?.pagination.pageSize) <
    Number(payload?.pagination.totalItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        setIsLoading(true);

        const params = searchParams.toString();

        const response = await fetch(
          `/api/business${params ? "?" + params : ""}`
        );
        const data = await response.json();

        setPayload(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  const { handleInputValueChange, handleLoadMore } = useHandlers({
    setInputValue,
    searchParams,
  });

  return (
    <main className="bg-brand-primary-blue -mt-24 pt-25 pb-[50px] min-h-dvh">
      <div className="container mx-auto mt-11.5 px-4">
        <h1 className="text-brand-primary-white font-lg xl:font-xl-plus mb-2 xl:mb-5">
          Interested Dealerships
        </h1>
        <section className="p-8 border rounded-[30px] bg-brand-primary-white w-full mb-4">
          <TextInput
            value={inputValue}
            onChange={handleInputValueChange}
            inputSuffix={isLoading && <LoadingIndicator aria-live="polite" />}
            label={
              <LabeledIcon
                src="/building.svg"
                alt="search input label icon"
                label="Search Company"
              />
            }
          />
        </section>
        <section className="w-full gap-4 flex flex-col">
          {isDataExist &&
            payload?.data.map(
              ({
                id,
                name,
                mobile_phone,
                postcode,
                company,
                email_address,
              }) => (
                <BusinessCard
                  key={id}
                  name={name}
                  phone={mobile_phone}
                  postCode={postcode}
                  company={company}
                  mail={email_address}
                />
              )
            )}
          {isLoading ? (
            <div
              aria-live="polite"
              className="card text-center font-lg xl:font-xl-plus"
            >
              Loading...
            </div>
          ) : error ? (
            <div aria-live="polite" className="card text-center">
              Failed to load the data
            </div>
          ) : !isDataExist ? (
            <div aria-live="polite" className="card text-center">
              No Data
            </div>
          ) : null}
          {isMoreItemsExist && (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              aria-busy={isLoading}
              data-testid="load-more"
              aria-label="Load More"
              className="rounded font-sm cursor-pointer text-brand-primary-white p-4 w-fit mx-auto hover:bg-brand-light-gray hover:text-brand-primary-black"
            >
              {isLoading && <LoadingIndicator />}
              <span>Load More...</span>
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
