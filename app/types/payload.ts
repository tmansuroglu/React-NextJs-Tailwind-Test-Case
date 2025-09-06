export type RegisterBusinessRequestPayload = {
  name: string;
  company: string;
  mobile_phone: string;
  email_address: string;
  postcode: string;
  pay_later: boolean;
  pay_now: boolean;
};

export type Business = RegisterBusinessRequestPayload & { id: string };
