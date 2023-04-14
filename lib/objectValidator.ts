import { DictionaryValidator } from './dictionaryValidator';
import { dataObject } from './exploration/exploration';
import { exploration } from './exploration/main';
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

    exploration(setting, {
      callback: ({ path, value }, handle) => {
        console.log('結果', path);

        stringTypeSetting(value, (name) => {
          const validationResult = this.validator.validation(name, target);
          if (validationResult) handle.stop();
          result = true;
          return validationResult;
        });

      },
    });

    return result;
  }
}

export const objectValidator = new ObjectValidator();
