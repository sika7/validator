import { ErrorValidate, IValidatePlugin, ValidateResult } from './types';
import { convertPluginToValidates } from './validate';

export class Validator {
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
      if (validate.check(target)) {
        this.result.push(validate.detail());
      }
    }
    return this.result;
  }

  getErrorMessage(): ErrorValidate {
    const message: string[] = [];
    const validates: string[] = [];
    this.result.map((data) => {
      message.push(data.errorMessage);
      validates.push(data.validateName);
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
    if (result.length > 0) return true;
    return false;
  }
}

export function validator(validatePlugins: IValidatePlugin[]): Validator {
  return new Validator(validatePlugins);
}
