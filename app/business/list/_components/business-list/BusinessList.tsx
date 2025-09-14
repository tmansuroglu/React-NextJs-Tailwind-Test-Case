import getBusinessList from "@/actions/get-business-list";
import BusinessCard from "../business-card";
import LoadMore from "../load-more";
import { SearchParamsType } from "@/types/search-param-type";

type BusinessListProps = {
  searchParams: SearchParamsType;
};

export async function BusinessList({ searchParams }: BusinessListProps) {
  const payload = await getBusinessList(searchParams);

  if (!payload) {
    return (
      <div aria-live="polite" className="card text-center">
        {/* TODO: Click here to refetch – could add a button to reload */}
        Failed to load the data
      </div>
    );
  }

  const doesDataExist = Number(payload.pagination.totalItems) > 0;
  const doesMoreItemExist =
    Number(payload.pagination.pageSize) < Number(payload.pagination.totalItems);

  if (!doesDataExist) {
    return (
      <div aria-live="polite" className="card text-center">
        No Data
      </div>
    );
  }

  return (
    <>
      {payload.data.map(
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
      {doesMoreItemExist && <LoadMore />}
    </>
  );
}
