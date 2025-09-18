import LoadingIndicator from "@/components/loading-indicator";
import PageContainer from "@/components/page-container";

export default function Loading() {
  return (
    <PageContainer className="bg-brand-primary-white flex">
      <LoadingIndicator
        className="flex-1"
        LoaderProps={{
          className: "size-20",
        }}
      />
    </PageContainer>
  );
}
