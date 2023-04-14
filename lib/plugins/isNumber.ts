interface IValidatePlugin {
  name: string
  errorMessage: string
  validation: (target: unknown) => boolean
}

export function isNumber(): IValidatePlugin {
  return {
    name: "number",
    errorMessage: "hoge",
    validation: (value) => {
      if (typeof value === 'number') {
        return !isNaN(value);
      }
      return false;
    },
  };
}
