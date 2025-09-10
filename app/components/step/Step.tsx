type StepProps = {
  number: number;
  title: string;
  description: string;
  "data-testid"?: string;
};

export function Step({ number, title, description, ...props }: StepProps) {
  return (
    <div
      className="flex gap-2"
      {...props}
      role="listitem"
      aria-label={`${number}. ${title}`}
    >
      <div
        aria-hidden="true"
        className="flex items-center justify-center font-xs-bold min-w-6 w-6 h-6 rounded-[50%] border border-brand-secondary-black bg-brand-primary-orange text-brand-secondary-black"
      >
        {number}
      </div>
      <div className="pb-6">
        <p className="font-sm-bold text-brand-primary-black">{title}</p>
        <p className="font-sm text-brand-primary-black">{description}</p>
      </div>
    </div>
  );
}
