import { DictionaryValidator } from './dictionaryValidator';
import { parsing, dataObject, ParsingError } from './parsing/main';
import { ValidatePlugin } from './types';

function getValidationNames(value: string): string[] {
  return value.split('|');
}

function stringTypeSetting(names: unknown, callback: (name: string) => unknown) {
  if (typeof names !== 'string') return;

  for (const name of getValidationNames(names)) {
    if (callback(name)) return;
  }
}

type ObjectValidatorError = {
  path: string;
  validateName: string;
  errorMessage: string;
};

export class ObjectValidator {
  validator: DictionaryValidator = new DictionaryValidator();

  use(plugin: ValidatePlugin) {
    this.validator.use(plugin);
  }

  validation(setting: dataObject, target: dataObject): void | ObjectValidatorError {
    let result: null | ObjectValidatorError = null;

    try {
      parsing(setting, target, {
        stringCallbakc: ({ path, roleModel, checkTarget }, handle) => {
          stringTypeSetting(roleModel.value, (name) => {
            try {
              const validationResult = this.validator.validation(name, checkTarget.value);
              if (validationResult) {
                handle.stop();
                result = {
                  path,
                  validateName: validationResult.validateName,
                  errorMessage: validationResult.errorMessage,
                };
              }
              return validationResult;
            } catch (e: unknown) {
              if (e instanceof Error) {
                handle.stop();
                result = {
                  path,
                  validateName: name,
                  errorMessage: e.message,
                };
              }
            }
          });
        },
      });
    } catch (error: unknown) {
      if (error instanceof ParsingError) {
        result = {
          path: error.path,
          validateName: '',
          errorMessage: error.message,
        };
      }
    }

    if (result) return result;
  }
}
