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

export function validation(validatePlugins: IValidatePlugin[], target: unknown): boolean {
  return new Validation(validatePlugins).run(target);
}
