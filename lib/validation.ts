import { IValidatePlugin } from './types'
import { Validate } from './validate'

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
  const validates: Validate[] = []
  for (const plugin of validatePlugins) {
    validates.push(new Validate(plugin))
  }
  return new Validation(validates)
}
