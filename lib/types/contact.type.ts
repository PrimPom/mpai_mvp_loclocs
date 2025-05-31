export interface ContactFormValues {
  name: string;
  firstname: string;
  email: string;
  phone: {
    countryCode: string;
    phoneNumber: string;
  };
  message: string;
}
