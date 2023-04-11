import { IValidatePlugin } from './types'

type TValidator = (target: unknown) => boolean
type TValidators = Record<string, TValidator>

class ValidatorOnes {
  validators: TValidators = {}

  use(plugin: IValidatePlugin) {
    const name = plugin.name
    const validator = plugin.validation
    if (this.validators[name]) throw new Error('Already registered.')
    this.validators[name] = validator
  }

  private check(name: string, target: unknown): boolean {
    if (!this.validators[name]) throw new Error('validator not found.')

    const validator = this.validators[name]
    if (validator(target)) return true
    return false
  }

  validation(name: string, target: unknown): boolean {
    return this.check(name, target)
  }
}

export const validatorOnes = new ValidatorOnes()
