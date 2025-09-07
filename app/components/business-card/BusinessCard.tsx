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
    <article className="card">
      <h2 className="font-md-plus-bold mb-5">{name}</h2>
      <dl>
        <div className="flex justify-between items-center py-4 border-t border-b border-brand-primary-gray">
          <dt className="font-sm-bold">Company</dt>
          <dd className="font-sm">{company}</dd>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-brand-primary-gray">
          {/* The original was Mobile phone number. 
            but on mobile the text either cover too much place or breaking it cause asymmetry */}
          <dt className="font-sm-bold">Phone</dt>
          <dd className="font-sm">{phone}</dd>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-brand-primary-gray">
          {/* The original was Email address. 
            but on mobile the text either cover too much place or breaking it cause asymmetry */}
          <dt className="font-sm-bold">Email</dt>
          <dd className="font-sm">{mail}</dd>
        </div>
        <div className="flex justify-between items-center py-4 border-b border-brand-primary-gray">
          <dt className="font-sm-bold">Postcode</dt>
          <dd className="font-sm">{postCode}</dd>
        </div>
      </dl>
    </article>
  );
}
