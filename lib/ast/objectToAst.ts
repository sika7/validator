import { childNode, dataObject, PrimitiveTypeData, RootNode } from './types';

function childrens(data: dataObject): childNode[] {
  const result: childNode[] = [];

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value) {
      const node = childNode(key, value);
      if (node) result.push(node);
    }
  }

  return result;
}

function childrensArrays(data: unknown[]) {
  const result: childNode[] = [];

  for (const [index, value] of data.entries()) {
    if (value) throw new Error('not found value');
    const node = childNode(String(index), value);
    if (node) result.push(node);
  }
  return result;
}

function childNode(key: string, value: unknown): childNode | void {
  if (typeof value === 'string') {
    return makePrimitiveTypeData('string', key, value);
  }
  if (typeof value === 'number') {
    return makePrimitiveTypeData('number', key, value);
  }
  if (typeof value === 'boolean') {
    return makePrimitiveTypeData('boolean', key, value);
  }
  if (typeof value === 'object' && typeof value !== 'function') {
    return {
      type: 'object',
      key: key,
      children: childrens(value as dataObject),
    };
  }
  if (Array.isArray(value)) {
    return {
      type: 'array',
      key: key,
      children: childrensArrays(value),
    };
  }
}

function makePrimitiveTypeData(
  type: 'string' | 'number' | 'boolean',
  key: string,
  value: string | number | boolean
): PrimitiveTypeData {
  return {
    type: type,
    key: key,
    value: value,
  };
}

function isDataObject(obj: unknown) {
  return obj !== null && typeof obj === 'object' && typeof obj !== 'function';
}

export function parse(obj: unknown): RootNode {
  if (isDataObject(obj)) {
    return {
      type: 'root',
      children: childrens(obj as dataObject),
    };
  }

  throw new Error('Enter an object of data type.');
}

// export function objectValidator(target: any, settings: any = {}): boolean {
//   for (const key of Object.keys(settings)) {
//     const targetValue = getProperty(target, key)
//     if (targetValue!) return true
//
//     const validationName = getProperty(settings, key)
//     if (validator.validation(validationName, targetValue)) return true
//   }
//
//   return false
// }
//
// export function arrayValidation(target: unknown[], settings: unknown[]): boolean {
//   if (!Array.isArray(settings)) throw new Error('settings not array.')
//
//   for (const data of settings) {
//     if (objectValidation(target, data)) return true
//   }
//
//   return false
// }
//
// export function objectValidation(target: any, settings: any = {}): boolean {
//   for (const key of Object.keys(settings)) {
//     const targetValue = getProperty(target, key)
//     if (targetValue!) return true
//
//     const validation = getProperty(settings, key)
//
//     if (Array.isArray(validation)) {
//       if (arrayValidation(targetValue, validation)) return true
//     }
//
//     if (validation instanceof Validation) {
//       if (validation.run(targetValue)) return true
//     }
//
//     if (isDataObject(validation)) {
//       const result = objectValidation(targetValue, validation)
//       if (result) return true
//     }
//   }
//   return false
// }
