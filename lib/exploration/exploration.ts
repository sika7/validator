type dataObject = Record<string, unknown> | Array<unknown>;

type explorationOption = {
  fullSearch?: boolean;
  callback?: (data: unknown) => void;
};

function isDataObject(obj: unknown) {
  return obj !== null && typeof obj === 'object' && typeof obj !== 'function';
}

function makePath(path: string, key: string | number): string {
  if (path === '') return `${key}`;
  return `${path}.${key}`;
}

function child(path: string, value: unknown, option: explorationOption) {
  const dataType = typeof value;
  if (dataType === 'string' || dataType === 'number' || dataType === 'boolean') {
    const { callback } = option;
    if (callback) callback(value);
  }
  if (isDataObject(value) && !Array.isArray(value)) {
    typeObject(path, value as dataObject, option);
  }
  if (Array.isArray(value)) {
    typeArrays(path, value, option);
  }
}

function typeObject(path: string, data: dataObject, option: explorationOption) {
  if (Array.isArray(data)) return;

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value) {
      child(makePath(path, key), value, option);
    }
  }
}

function typeArrays(path: string, data: unknown[], option: explorationOption) {
  for (const [index, value] of data.entries()) {
    if (value) child(makePath(path, index), value, option);
  }
}

export function exploration(data: dataObject, option?: explorationOption) {
  const defaultOption: explorationOption = {
    fullSearch: false,
  };

  if (!isDataObject(data)) {
    throw new Error('not data object.');
  }
  child('', data, { ...defaultOption, ...option });
}
