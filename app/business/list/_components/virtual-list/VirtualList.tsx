"use client";

import { BusinessListResponsePayload } from "@/types/payload";
import { useVirtualizer } from "@tanstack/react-virtual";
import BusinessCard from "../business-card";
import { useRef } from "react";

type VirtualListPayload = {
  payload: BusinessListResponsePayload;
};

export function VirtualList({ payload }: VirtualListPayload) {
  const ref = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: payload.data.length,
    getScrollElement: () => ref?.current || null,
    measureElement: (element) => element.clientHeight,
    estimateSize: () => 347,
    gap: 16,
  });

  return (
    <div
      ref={ref}
      style={{
        height: `400px`,
        overflow: "auto",
      }}
    >
      <div
        className="w-full relative"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <BusinessCard
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            key={virtualItem.key}
            name={payload.data[virtualItem.index]?.name}
            phone={payload.data[virtualItem.index]?.mobile_phone}
            postCode={payload.data[virtualItem.index]?.postcode}
            company={payload.data[virtualItem.index]?.company}
            mail={payload.data[virtualItem.index]?.email_address}
          />
        ))}
      </div>
    </div>
  );
}
