import { IValidatePlugin } from './types'
import { convertPluginToValidates, Validate } from './validate'

export class Validation {
  validates: Validate[] = []
  constructor(validates: Validate[]) {
    this.validates = validates
  }

  run(target: unknown) {
    for (const validate of this.validates) {
      if (validate.check(target)) return true
    }
    return false
  }
}

export function validation(validatePlugins: IValidatePlugin[]): Validation {
  return new Validation(convertPluginToValidates(validatePlugins))
}
