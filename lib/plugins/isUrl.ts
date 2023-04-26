import { ValidatePlugin } from '../types';

export function isUrl(): ValidatePlugin {
  return {
    name: 'url',
    errorMessage: 'not url',
    validation: (value) => {
      if (!value || typeof value !== 'string') return false;
      try {
        new URL(value);
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
