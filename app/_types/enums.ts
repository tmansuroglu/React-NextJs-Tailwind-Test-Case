export enum Routes {
  Business = "/business",
  Driver = "/driver",
  BusinessLogin = "/business/login",
  BusinessRegister = "/business/register",
  BusinessList = "/business/list",
  DriverLogin = "/driver/login",
  DriverRegister = "/driver/register",
}

export enum SearchParamKeys {
  Page = "page",
  PageSize = "pageSize",
  CompanyName = "company",
}

export enum RegisterBusinessFormFields {
  Name = "name",
  Company = "company",
  MobilePhone = "mobile_phone",
  Email = "email_address",
  PostCode = "postcode",
  PayLater = "pay_later",
  PayNow = "pay_now",
}
