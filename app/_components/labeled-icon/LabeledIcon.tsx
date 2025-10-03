import Image from "next/image";
import React, { FC, ReactNode, SVGProps } from "react";

type LabeledIconProps =
  | {
      IconComponent?: undefined;
      IconComponentProps?: undefined;
      src: string;
      alt: string;
      label: ReactNode;
      unoptimized?: boolean;
    }
  | {
      IconComponent?: FC<SVGProps<SVGElement>>;
      IconComponentProps?: SVGProps<SVGElement> & { "data-testid"?: string };
      src?: undefined;
      alt?: undefined;
      label: ReactNode;
      unoptimized?: undefined;
    };

export function LabeledIcon({
  src,
  alt,
  label,
  unoptimized,
  IconComponent,
  IconComponentProps,
}: LabeledIconProps) {
  return (
    <div className="flex gap-1.5 items-center" data-testid="labeled-icon">
      {IconComponent ? (
        <IconComponent {...IconComponentProps} />
      ) : (
        <Image
          src={src || ""}
          height={19}
          width={16}
          alt={alt || ""}
          className="w-auto h-auto"
          unoptimized={unoptimized}
        />
      )}
      <span className="font-sm-bold">{label}</span>
    </div>
  );
}
