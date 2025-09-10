import type { Metadata } from "next";
import BusinessList from "../../components/business-list";
import BusinessSearchInput from "../../components/business-search-Input";

export const metadata: Metadata = {
  title: "Bumper UK - Business List Page",
};

export default function ListPage() {
  // TODO: create page container to use on all pages
  return (
    <main className="bg-brand-primary-blue -mt-24 pt-25 pb-13 min-h-dvh">
      <div className="container mx-auto mt-11.5 px-4">
        <h1 className="text-brand-primary-white font-lg xl:font-xl-plus mb-2 xl:mb-5">
          Interested Dealerships
        </h1>
        <section className="p-8 border rounded-4xl bg-brand-primary-white w-full mb-4">
          <BusinessSearchInput />
        </section>
        <section className="w-full gap-4 flex flex-col">
          <BusinessList />
        </section>
      </div>
    </main>
  );
}
