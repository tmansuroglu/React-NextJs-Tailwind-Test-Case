import BusinessCard from "../business-card";
import { BusinessListResponsePayload } from "../../../../_types/payload";
import LoadMore from "../load-more";

type BusinessListProps = {
  payload: BusinessListResponsePayload | null;
};

export function BusinessList({ payload }: BusinessListProps) {
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
