export interface IValidatePlugin {
  name: string;
  errorMessage: string;
  validation: (target: unknown) => boolean;
}

export interface ValidateResult {
  result: boolean;
  validateName: string;
  errorMessage: string;
  value: unknown;
}

export interface ErrorValidate {
  value: unknown;
  validates: string[];
  message: string[];
}
