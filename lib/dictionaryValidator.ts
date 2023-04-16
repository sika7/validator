import { IValidatePlugin } from './types';
import { Validate } from './validate';

type TValidators = Record<string, Validate>;

type DictionaryValidatorError = {
  validateName: string;
  errorMessage: string;
};

export class DictionaryValidator {
  validators: TValidators = {};

  use(plugin: IValidatePlugin) {
    const name = plugin.name;
    if (this.validators[name]) throw new Error('Already registered.');
    this.validators[name] = new Validate(plugin);
  }

  private selectValidator(name: string) {
    if (!this.validators[name]) throw new Error('validator not found.');

    return this.validators[name];
  }

  private check(name: string, target: unknown): boolean {
    const validator = this.selectValidator(name);
    return validator.check(target);
  }

  validation(name: string, target: unknown): DictionaryValidatorError | void {
    if (this.check(name, target)) {
      const validator = this.selectValidator(name);
      return validator.detail();
    }
  }
}
