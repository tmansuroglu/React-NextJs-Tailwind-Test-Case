import getBusinessList from "@/actions/get-business-list";
import { SearchParamsType } from "@/types/search-param-type";
import VirtualList from "../virtual-list";

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

  return <VirtualList payload={payload} />;
}
