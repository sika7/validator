import { DictionaryValidator } from './dictionaryValidator';
import { parsing, dataObject } from './parsing/main';
import { IValidatePlugin } from './types';

function getValidationNames(value: string): string[] {
  if (typeof value !== 'string') throw new Error('argument is not a string.');
  return value.split('.');
}

function stringTypeSetting(names: unknown, callback: (name: string) => boolean) {
  if (typeof names !== 'string') return;

  for (const name of getValidationNames(names)) {
    if (callback(name)) return;
  }
}

export class ObjectValidator {
  validator: DictionaryValidator = new DictionaryValidator();

  use(plugin: IValidatePlugin) {
    this.validator.use(plugin);
  }

  validation(setting: dataObject, target: dataObject): boolean {
    let result = false;

    parsing(setting, target, {
      stringCallbakc: ({ roleModel, checkTarget }, handle) => {

        stringTypeSetting(roleModel.value, (name) => {
          const validationResult = this.validator.validation(name, checkTarget.value);
          if (validationResult) {
            handle.stop();
            result = true;
          }
          return validationResult;
        });
      },
      errorCallback: () => {
        result = true;
        return;
      },
    });

    return result;
  }
}

export const objectValidator = new ObjectValidator();
