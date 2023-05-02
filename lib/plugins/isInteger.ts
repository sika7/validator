import { ValidatePlugin } from 'types';

export function isInteger(): ValidatePlugin {
  return {
    name: 'integer',
    errorMessage: 'not integer',
    validation: (value) => {
      if (typeof value !== 'number') return false;
      return Number.isInteger(value);
    },
  };
}
