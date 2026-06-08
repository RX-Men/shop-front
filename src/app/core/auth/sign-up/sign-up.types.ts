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
  dateOfBirth: string;
  // commercetools supports multiple addresses per customer; we register with exactly one
  addresses: [SignUpAddress];
  // index into the addresses array; literal 0 because right now we have a single address
  defaultShippingAddress: 0;
  defaultBillingAddress: 0;
}
