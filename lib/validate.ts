import { IValidatePlugin, ValidateResult } from './types'

export class Validate {
  config: IValidatePlugin
  constructor(config: IValidatePlugin) {
    this.config = config
  }

  check(target: unknown): boolean {
    if (this.config.validation(target)) return true
    return false
  }

  result(target: unknown): ValidateResult {
    return {
      result: this.check(target),
      validateName: this.config.name,
      errorMessage: this.config.errorMessage,
      value: target,
    }
  }
}
