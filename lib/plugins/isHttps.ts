import { ValidatePlugin } from '../types';

export function isHttps(): ValidatePlugin {
  return {
    name: 'https',
    errorMessage: 'not https',
    validation: (value) => {
      if (!value || typeof value !== 'string') return false;
      const regex = new RegExp('^https?://*.');
      return regex.test(value);
    },
  };
}
