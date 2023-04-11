interface IValidatePlugin {
  name: string
  errorMessage: string
  validation: (target: unknown) => boolean
}

interface ValidateResult {
  result: boolean
  validateName: string
  errorMessage: string
  value: unknown
}

class Validate {
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

interface ErrorValidate {
  value: unknown
  validates: string[]
  message: string[]
}

class Validator {
  validates: Validate[] = []
  result: ValidateResult[] = []
  target: unknown

  constructor(validates: Validate[]) {
    this.validates = validates
  }

  private checkAll(target: unknown) {
    for (const validate of this.validates) {
      this.result.push(validate.result(target))
    }
    return this.result.find((data) => data.result === true)
  }

  getErrorMessage(): ErrorValidate {
    const message: string[] = []
    const validates: string[] = []
    this.result.map((data) => {
      if (data.result === true) {
        message.push(data.errorMessage)
        validates.push(data.validateName)
      }
    })
    return {
      value: this.target,
      validates: validates,
      message: message,
    }
  }

  validation(target: unknown) {
    this.target = target
    const result = this.checkAll(target)
    if (result) return true
    return false
  }
}

export function validator(validatePlugins: IValidatePlugin[]): Validator {
  const validates: Validate[] = []
  for (const plugin of validatePlugins) {
    validates.push(new Validate(plugin))
  }
  return new Validator(validates)
}

class Validation {
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

const isDataObject = (x: unknown): boolean => x !== null && (typeof x === 'object' || typeof x !== 'function')

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

// export function objectValidator(
//   target: any,
//   settings: any = {}
// ): boolean {
//   for (const key of Object.keys(settings)) {
//     const targetValue = getProperty(target, key);
//     if (targetValue!) return true;
//
//     const validationName = getProperty(settings, key);
//     if (validator.validation(validationName, targetValue)) return true;
//   }
//
//   return false;
// }

// export function arrayValidation(target: unknown[], settings: unknown[]): boolean {
//   if (!Array.isArray(settings)) throw new Error('settings not array.')
// 
//   for (const data of settings) {
//     if (objectValidation(target, data)) return true
//   }
// 
//   return false
// }

// export function objectValidation(target: any, settings: any = {}): boolean {
//   for (const key of Object.keys(settings)) {
//     const targetValue = getProperty(target, key);
//     if (targetValue!) return true;
//
//     const validation = getProperty(settings, key);
//
//     if (Array.isArray(validation)) {
//       if (arrayValidation(targetValue, validation)) return true;
//     }
//
//     if (validation instanceof Validation) {
//       if (validation.run(targetValue)) return true;
//     }
//
//     if (isDataObject(validation)) {
//       const result = objectValidation(targetValue, validation);
//       if (result) return true;
//     }
//   }
//   return false;
// }
