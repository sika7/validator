import { IValidatePlugin } from './types';
import { Validate } from './validate';

type TValidators = Record<string, Validate>;

class ValidatorOnes {
  validators: TValidators = {};

  use(plugin: IValidatePlugin) {
    const name = plugin.name;
    if (this.validators[name]) throw new Error('Already registered.');
    this.validators[name] = new Validate(plugin);
  }

  private check(name: string, target: unknown): boolean {
    if (!this.validators[name]) throw new Error('validator not found.');

    const validate = this.validators[name];
    if (validate.check(target)) return true;
    return false;
  }

  validation(name: string, target: unknown): boolean {
    return this.check(name, target);
  }
}

export const validatorOnes = new ValidatorOnes();
