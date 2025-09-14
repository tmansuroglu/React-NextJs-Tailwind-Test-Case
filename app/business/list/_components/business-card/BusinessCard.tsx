type BusinessCardProps = {
  name: string;
  company: string;
  phone: string;
  postCode: string;
  mail: string;
};

export function BusinessCard({
  name,
  company,
  phone,
  postCode,
  mail,
}: BusinessCardProps) {
  return (
    <article className="card" data-testid="business-card">
      <h2 className="font-md-plus-bold mb-5 break-all">{name}</h2>
      <dl>
        <div className="flex justify-between items-center py-4 border-t border-b border-brand-primary-gray gap-5">
          <dt className="font-sm-bold">Company</dt>
          <dd className="font-sm break-all">{company}</dd>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-brand-primary-gray gap-5">
          {/* The original was Mobile phone number. 
            but on mobile the text either cover too much place or breaking it cause asymmetry */}
          <dt className="font-sm-bold">Phone</dt>
          <dd className="font-sm break-all">{phone}</dd>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-brand-primary-gray gap-5">
          {/* The original was Email address. 
            but on mobile the text either cover too much place or breaking it cause asymmetry */}
          <dt className="font-sm-bold">Email</dt>
          <dd className="font-sm break-all">{mail}</dd>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-brand-primary-gray gap-5">
          <dt className="font-sm-bold">Postcode</dt>
          <dd className="font-sm break-all">{postCode}</dd>
        </div>
      </dl>
    </article>
  );
}
