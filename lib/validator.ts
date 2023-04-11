import { ErrorValidate, IValidatePlugin, ValidateResult } from './types'
import { convertPluginToValidates, Validate } from './validate'

class Validator {
  validates: Validate[] = []
  result: ValidateResult[] = []
  target: unknown

  constructor(validates: Validate[]) {
    this.validates = validates
  }

  private checkAll(target: unknown) {
    for (const validate of this.validates) {
      this.result.push(validate.detail(target))
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
  return new Validator(convertPluginToValidates(validatePlugins))
}

const isDataObject = (x: unknown): boolean => x !== null && (typeof x === 'object' || typeof x !== 'function')

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
