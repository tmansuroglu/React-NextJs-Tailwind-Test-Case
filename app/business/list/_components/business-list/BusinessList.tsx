import getBusinessList from "@/actions/get-business-list";
import { SearchParamsType } from "@/types/search-param-type";
import BusinessCard from "../business-card";
import Pagination from "@/components/pagination";

type BusinessListProps = {
  searchParams: SearchParamsType;
};

export async function BusinessList({ searchParams }: BusinessListProps) {
  const payload = await getBusinessList(searchParams);

  if (!payload) {
    return (
      <div aria-live="polite" className="card text-center" role="alert">
        Failed to load the data
      </div>
    );
  }

  const doesDataExist = Number(payload.pagination.totalItems) > 0;

  if (!doesDataExist) {
    return (
      <div aria-live="polite" className="card text-center" role="alert">
        No Data
      </div>
    );
  }

  return (
    <>
      {payload.data.map((item) => (
        <BusinessCard
          key={item.id}
          name={item.name}
          phone={item.mobile_phone}
          postCode={item.postcode}
          company={item.company}
          mail={item.email_address}
        />
      ))}
      {payload.pagination.numberOfPages > 1 && (
        <Pagination
          currentPage={payload.pagination.currentPage}
          numberOfPages={payload.pagination.numberOfPages}
          aria-label="Pagination for business results"
        />
      )}
    </>
  );
}
