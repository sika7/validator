import { ValidatePlugin } from 'types';

export function isNumber(): ValidatePlugin {
  return {
    name: 'number',
    errorMessage: 'not number',
    validation: (value) => {
      if (typeof value === 'number') {
        return !isNaN(value);
      }
      return false;
    },
  };
}
