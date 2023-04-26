import { ValidatePlugin, ValidateResult } from './types';

/**
 * Validate. (Basic unit of validation)
 */
export class Validate {
  config: ValidatePlugin;
  constructor(config: ValidatePlugin) {
    this.config = config;
  }

  /**
   * check.
   *
   * @param {unknown} target
   * @returns {boolean} returns true if there is an error
   */
  check(target: unknown): boolean {
    if (!this.config.validation(target)) return true;
    return false;
  }

  detail(): ValidateResult {
    return {
      validateName: this.config.name,
      errorMessage: this.config.errorMessage,
    };
  }
}

export function convertPluginToValidates(validatePlugins: ValidatePlugin[]) {
  const validates: Validate[] = [];
  for (const plugin of validatePlugins) {
    validates.push(new Validate(plugin));
  }
  return validates;
}
