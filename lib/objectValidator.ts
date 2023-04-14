import { DictionaryValidator } from './dictionaryValidator';
import { parsing, dataObject } from './parsing/main';
import { IValidatePlugin } from './types';

function getValidationNames(value: string): string[] {
  if (typeof value !== 'string') throw new Error('argument is not a string.');
  return value.split('.');
}

function stringTypeSetting(names: unknown, callback: (name: string) => unknown) {
  if (typeof names !== 'string') return;

  for (const name of getValidationNames(names)) {
    if (callback(name)) return;
  }
}

type ObjectValidatorOption = {
  errorType: 'message' | 'throwError';
};

type ObjectValidatorError = {
  path: string;
  validateName: string;
  errorMessage: string;
};

export class ObjectValidator {
  validator: DictionaryValidator = new DictionaryValidator();

  option: ObjectValidatorOption;

  constructor(option: Partial<ObjectValidatorOption>) {
    const defaultOption: ObjectValidatorOption = {
      errorType: 'message',
    };
    this.option = { ...defaultOption, ...option };
  }

  use(plugin: IValidatePlugin) {
    this.validator.use(plugin);
  }

  validation(setting: dataObject, target: dataObject): void | ObjectValidatorError {
    let result: null | ObjectValidatorError = null;

    parsing(setting, target, {
      stringCallbakc: ({ path, roleModel, checkTarget }, handle) => {
        stringTypeSetting(roleModel.value, (name) => {
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
        });
      },
      errorCallback: ({ path }) => {
        result = {
          path,
          validateName: '',
          errorMessage: 'お手本データ通りに検証データにデータがありません',
        };
        return;
      },
    });

    if (result) return result;
  }
}
