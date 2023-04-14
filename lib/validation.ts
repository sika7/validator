import { IValidatePlugin } from './types';
import { convertPluginToValidates } from './validate';

export class Validation {
  plugins: IValidatePlugin[] = [];
  constructor(plugins: IValidatePlugin[]) {
    this.plugins = plugins;
  }

  run(target: unknown) {
    const validates = convertPluginToValidates(this.plugins);
    for (const validate of validates) {
      if (validate.check(target)) return true;
    }
    return false;
  }
}

export function createValidation(validatePlugins: IValidatePlugin[]): Validation {
  return new Validation(validatePlugins);
}

export function validation(validatePlugins: IValidatePlugin[], target: unknown): boolean {
  return createValidation(validatePlugins).run(target);
}
