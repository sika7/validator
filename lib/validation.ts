import { IValidatePlugin } from './types';
import { convertPluginToValidates } from './validate';

/**
 * validation.
 *
 * @param {IValidatePlugin[]} validatePlugins
 * @param {unknown} target
 * @returns {boolean} Return true if there is an error in validation, and false if there is no error.
 */
export function validation(validatePlugins: IValidatePlugin[], target: unknown): boolean {
  for (const validate of convertPluginToValidates(validatePlugins)) {
    if (validate.check(target)) return true;
  }
  return false;
}
