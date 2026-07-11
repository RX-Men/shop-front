export interface SignUpAddress {
  streetName: string;
  country: string;
  postalCode: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
