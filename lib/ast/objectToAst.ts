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

function executeExploration(data: childNode, callback: (data: childNode) => childNode) {
  data = callback(data);
  if (data !== null && (data.type === 'object' || data.type === 'array')) {
    data.children = data.children.map((item) => executeExploration(item, callback));
    return data;
  }
  return data;
}

export function execute(node: RootNode, callback: (data: childNode) => childNode): RootNode {
  node.children = node.children.map((item) => executeExploration(item, callback));
  return node;
}

function conversionExploration(data: childNode): unknown {
  if (data.type === 'string' || data.type === 'boolean' || data.type === 'number') {
    return data.value;
  }
  if (data.type === 'array') {
    const result: unknown[] = [];
    data.children.forEach((item) => {
      result.push(conversionExploration(item));
    });
    return [];
  }

  if (data.type === 'object') {
    const result: Record<string, unknown> = {};
    data.children.map((item) => {
      const a = conversionExploration(item);
      if (a) {
        result[item.key] = a;
      }
    });
    return result;
  }
  return undefined;
}

export function conversionToAnObject(node: RootNode): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  node.children.map((item) => {
    const data = conversionExploration(item);
    if (data) {
      result[item.key] = data;
    }
  });

  return result;
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
