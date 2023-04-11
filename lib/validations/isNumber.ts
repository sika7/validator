interface IValidatePlugin {
  name: string
  errorMessage: string
  validation: (target: unknown) => boolean
}

export function isNumber(): IValidatePlugin {
  return {
    name: "number",
    errorMessage: "hoge",
    validation: () => true,
  };
}
