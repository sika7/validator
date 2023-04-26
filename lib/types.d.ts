export interface ValidatePlugin {
  name: string;
  errorMessage: string;
  validation: (target: unknown) => boolean;
}

export interface ValidateResult {
  validateName: string;
  errorMessage: string;
}

export interface ErrorValidate {
  value: unknown;
  validates: string[];
  message: string[];
}
