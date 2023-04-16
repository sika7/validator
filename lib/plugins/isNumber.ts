interface IValidatePlugin {
  name: string
  errorMessage: string
  validation: (target: unknown) => boolean
}

export function isNumber(): IValidatePlugin {
  return {
    name: "number",
    errorMessage: "not number",
    validation: (value) => {
      if (typeof value === 'number') {
        return !isNaN(value);
      }
      return false;
    },
  };
}
