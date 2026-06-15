export interface CompanyInfo {
  title: string;
  description: string;
  copyright: string;
}

export interface AddressDetails {
  company: string;
  street: string;
  city: string;
}

export interface Headquarters {
  title: string;
  address: AddressDetails;
}

export interface Inquiries {
  title: string;
  phone: string;
  label: string;
}

export interface AboutData {
  companyInfo: CompanyInfo;
  headquarters: Headquarters;
  inquiries: Inquiries;
}
