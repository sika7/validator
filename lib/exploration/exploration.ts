export type dataObject = Record<string, unknown> | Array<unknown>;

export type Option = {
  callback: (data: Argument, handle: Handle) => void;
};

type Argument = {
  path: string;
  value: unknown;
};

export class Handle {
  private stopFlg = false;

  stop() {
    this.stopFlg = true;
  }

  isStop() {
    return this.stopFlg;
  }
}

export function isDataObject(obj: unknown) {
  return obj !== null && typeof obj === 'object' && typeof obj !== 'function';
}

function makePath(path: string, key: string | number): string {
  if (path === '') return `${key}`;
  return `${path}.${key}`;
}

function makeArgument(data: Partial<Argument>) {
  const defaultArgument: Argument = {
    path: '',
    value: undefined,
  };
  return {
    ...defaultArgument,
    ...data,
  };
}

export function child(path: string, value: unknown, option: Option, handle: Handle) {
  if (handle.isStop()) return;

  if (Array.isArray(value)) return typeArrays(path, value, option, handle);

  if (isDataObject(value) && !Array.isArray(value)) return typeObject(path, value as dataObject, option, handle);

  const { callback } = option;
  callback(makeArgument({ path: path, value: value }), handle);
}

export function typeObject(path: string, data: dataObject, option: Option, handle: Handle) {
  if (handle.isStop()) return;

  if (Array.isArray(data)) return;

  for (const key of Object.keys(data)) {
    const value = data[key];
    if (value) {
      child(makePath(path, key), value, option, handle);
    }
  }
}

export function typeArrays(path: string, data: unknown[], option: Option, handle: Handle) {
  if (handle.isStop()) return;

  for (const [index, value] of data.entries()) {
    if (value) {
      child(makePath(path, index), value, option, handle);
    }
  }
}
