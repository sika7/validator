interface IValidatorPlugin {
  name: string;
  validate: (target: any) => boolean;
}

// function NumberValidator(): IValidatorPlugin {
//   return {
//     name: "number",
//     validate: (target: any) => false,
//   };
// }

function variation(): boolean {
  return false;
}

type TValidator = (target: any) => boolean;
type TValidators = Record<string, TValidator>;

class Validator {
  validators: TValidators = {};

  use(plugin: IValidatorPlugin) {
    const name = plugin.name;
    const validator = plugin.validate;
    if (this.validators[name]) throw new Error("Already registered.");
    this.validators[name] = validator;
  }

  private check(name: string, target: any): boolean {
    if (!this.validators[name]) throw new Error("validator not found.");

    const validator = this.validators[name];
    if (validator(target)) return true;
    return false;
  }

  validation(name: string, target: any): boolean {
    return this.check(name, target);
  }
}

export const validator = new Validator();

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
