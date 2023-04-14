import { ErrorValidate, IValidatePlugin, ValidateResult } from './types';
import { convertPluginToValidates } from './validate';

class Validator {
  plugins: IValidatePlugin[] = [];
  result: ValidateResult[] = [];
  target: unknown;

  constructor(plugins: IValidatePlugin[]) {
    this.plugins = plugins;
  }

  private checkAll(target: unknown) {
    const validates = convertPluginToValidates(this.plugins);
    this.result = [];
    for (const validate of validates) {
      this.result.push(validate.detail(target));
    }
    return this.result.find((data) => data.result === true);
  }

  getErrorMessage(): ErrorValidate {
    const message: string[] = [];
    const validates: string[] = [];
    this.result.map((data) => {
      if (data.result === true) {
        message.push(data.errorMessage);
        validates.push(data.validateName);
      }
    });
    return {
      value: this.target,
      validates: validates,
      message: message,
    };
  }

  validation(target: unknown) {
    this.target = target;
    const result = this.checkAll(target);
    if (result) return true;
    return false;
  }
}

export function validator(validatePlugins: IValidatePlugin[]): Validator {
  return new Validator(validatePlugins);
}
