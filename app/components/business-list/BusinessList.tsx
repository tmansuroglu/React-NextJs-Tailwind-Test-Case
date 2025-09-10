"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BusinessListResponsePayload } from "../../types/payload";
import BusinessCard from "../business-card";
import { useHandleLoadMore } from "./BusinessList.utils";
import LoadingIndicator from "../loading-indicator";

export function BusinessList() {
  const searchParams = useSearchParams();

  const [payload, setPayload] = useState<BusinessListResponsePayload>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = useHandleLoadMore();

  const doesDataExist = Number(payload?.pagination.totalItems) > 0;

  const doesMoreItemExist =
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

  return (
    <>
      {doesDataExist &&
        payload?.data.map(
          ({ id, name, mobile_phone, postcode, company, email_address }) => (
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
      ) : !doesDataExist ? (
        <div aria-live="polite" className="card text-center">
          No Data
        </div>
      ) : null}
      {doesMoreItemExist && (
        // TODO: make this a button component
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
    </>
  );
}
