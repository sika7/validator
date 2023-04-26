import { ValidatePlugin } from '../types';

export function isString(): ValidatePlugin {
  return {
    name: 'string',
    errorMessage: 'not string',
    validation: (value) => {
      if (typeof value === 'string' || value instanceof String) return true;
      return false;
    },
  };
}
