export type dataObject = Record<string, unknown>;

export class ParsingError extends Error {
  path = '';
  constructor(message: string, path: string) {
    super(message);
    this.path = path;
  }
}

type optionParsingArgument = {
  path: string;
  key: string;
  roleModel: {
    value: unknown;
  };
  checkTarget: {
    value: unknown;
  };
};

type Argument = {
  path: string;
  key: string;
  roleModel: dataObject;
  checkTarget: dataObject;
  option: Option;
  handle: Handle;
};

export type Option = {
  stringCallbakc: (data: optionParsingArgument, handle: Handle) => void;
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

function isDataObject(obj: unknown) {
  return obj !== null && typeof obj === 'object' && typeof obj !== 'function';
}

function makePath(path: string, key: string | number): string {
  if (path === '') return `${key}`;
  return `${path}.${key}`;
}

function child(argument: Argument) {
  const { path, key, handle, roleModel, checkTarget } = argument;
  if (handle.isStop()) return;

  argument.path = makePath(path, key);
  if (isDataObject(roleModel) && !Array.isArray(roleModel)) return typeObject(argument);

  if (typeof roleModel === 'string') {
    const { stringCallbakc } = argument.option;
    try {
      stringCallbakc(
        {
          path,
          key,
          roleModel: {
            value: roleModel,
          },
          checkTarget: {
            value: checkTarget,
          },
        },
        handle
      );
    } catch (error: unknown) {
      handle.stop();
      if (error instanceof Error) {
        throw new ParsingError(error.message, path);
      }
    }
  }
}

function typeObject(argument: Argument) {
  const { path, handle, roleModel, checkTarget } = argument;

  for (const key of Object.keys(roleModel)) {
    if (handle.isStop()) return;
    const newPath = makePath(path, key);
    const roleModelChild = roleModel[key] as dataObject;
    const checkTargetChild = checkTarget[key] as dataObject;
    if (checkTargetChild === undefined) throw new ParsingError(`${newPath} is No data.`, newPath);
    child({
      ...argument,
      key: key,
      roleModel: roleModelChild,
      checkTarget: checkTargetChild,
    });
  }
}

type parsingOption = Partial<Option>;

export function parsing(roleModel: dataObject, checkTarget: dataObject, option: parsingOption): void {
  const handle = new Handle();

  const defaultOption: Option = {
    stringCallbakc: () => {
      return;
    },
  };

  child({ path: '', key: '', roleModel, checkTarget, option: { ...defaultOption, ...option }, handle });
}
