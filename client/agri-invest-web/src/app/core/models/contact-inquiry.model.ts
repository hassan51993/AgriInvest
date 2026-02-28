export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ApiResult<T> {
  isSuccess: boolean;
  value: T;
  errorMessage: string;
}
