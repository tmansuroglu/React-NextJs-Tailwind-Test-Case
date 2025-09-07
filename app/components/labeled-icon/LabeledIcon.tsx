import Image from "next/image";
import React, { ReactNode } from "react";

type LabeledIconProps = {
  src: string;
  alt: string;
  label: ReactNode;
};

export function LabeledIcon({ src, alt, label }: LabeledIconProps) {
  return (
    <div className="flex gap-1.5 items-center" data-testid="labeled-icon">
      <Image
        src={src}
        height={19}
        width={16}
        alt={alt}
        className="w-auto h-auto"
      />
      <span className="font-sm-bold">{label}</span>
    </div>
  );
}
