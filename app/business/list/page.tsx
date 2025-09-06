import type { Metadata } from "next";
import TextInput from "../../components/text-input";
import Image from "next/image";
import BusinessCard from "../../components/business-card";

export const metadata: Metadata = {
  title: "Bumper UK - Business List Page",
};

// TODO: fetch data
// TODO: add pagination
export default function ListPage() {
  return (
    <main className="bg-brand-primary-blue -mt-25 pt-25 pb-[50px] min-h-dvh">
      <div className="container mx-auto mt-11.5 px-4">
        <h1 className="text-brand-primary-white font-lg xl:font-xl-plus mb-2 xl:mb-5">
          Interested Dealerships
        </h1>
        <section className="p-8 border rounded-[30px] bg-brand-primary-white w-full mb-4">
          <TextInput
            label={
              <div className="flex gap-1.5 items-center">
                <Image
                  src="/building.svg"
                  height={19}
                  width={16}
                  alt="building icon"
                  className="w-auto h-auto"
                />
                <span className="font-sm-bold">Search Company</span>
              </div>
            }
          />
        </section>
        <section className="w-full gap-4 flex flex-col">
          <BusinessCard name="1" company="2" phone="3" mail="4" postCode="5" />
          <BusinessCard name="1" company="2" phone="3" mail="4" postCode="5" />
          <button className="rounded font-sm cursor-pointer text-brand-primary-white p-4 w-fit mx-auto hover:bg-brand-light-gray hover:text-brand-primary-black">
            Load More...
          </button>
        </section>
      </div>
    </main>
  );
}
