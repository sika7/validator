type dataObject = Record<string, unknown> | Array<unknown>;

type explorationOption = {
  fullSearch?: boolean;
  callback?: (data: explorationArgument) => void;
};

type explorationArgument = {
  path: string;
  type: 'array' | 'primitive';
  value: unknown;
};

type argument = {
  path?: string;
  type?: 'array' | 'primitive';
  value?: unknown;
};

function isDataObject(obj: unknown) {
  return obj !== null && typeof obj === 'object' && typeof obj !== 'function';
}

function makePath(path: string, key: string | number): string {
  if (path === '') return `${key}`;
  return `${path}.${key}`;
}

function makeArgument(data: argument) {
  const defaultArgument: explorationArgument = {
    path: '',
    type: 'primitive',
    value: undefined,
  };
  return {
    ...defaultArgument,
    ...data,
  };
}

function child(path: string, value: unknown, option: explorationOption) {
  const dataType = typeof value;
  if (dataType === 'string' || dataType === 'number' || dataType === 'boolean') {
    const { callback } = option;
    if (callback) callback(makeArgument({ path: path, value: value }));
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
    // if (value) child(makePath(path, index), value, option);
    if (value) {
      const { callback } = option;
      if (callback)
        callback(
          makeArgument({
            path: makePath(path, index),
            type: 'array',
            value: value,
          })
        );
    }
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
