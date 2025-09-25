import LoadingIndicator from "@/components/loading-indicator";
import Main from "@/components/main";

export default function Loading() {
  return (
    <Main className="bg-brand-primary-blue flex">
      <LoadingIndicator
        className="flex-1"
        LoaderProps={{
          className: "size-20",
        }}
      />
    </Main>
  );
}
