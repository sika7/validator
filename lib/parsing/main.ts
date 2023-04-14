export type dataObject = Record<string, unknown>;

type optionParsingArgument = {
  key: string;
  roleModel: {
    value: unknown;
  };
  checkTarget: {
    value: unknown;
  };
};

type parsingErrorArgument = {
  path: string;
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
  errorCallback: (data: parsingErrorArgument) => void;
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
    stringCallbakc(
      {
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
  }
}

function typeObject(argument: Argument) {
  const { path, handle, roleModel, checkTarget, option } = argument;
  if (handle.isStop()) return;
  if (Array.isArray(roleModel)) return;

  for (const key of Object.keys(roleModel)) {
    const newPath = makePath(path, key);
    try {
      const roleModelChild = roleModel[key] as dataObject;
      const checkTargetChild = checkTarget[key] as dataObject;
      if (checkTargetChild === undefined) throw new Error(`${newPath} is No data.`);
      child({
        ...argument,
        key: key,
        roleModel: roleModelChild,
        checkTarget: checkTargetChild,
      });
    } catch (e) {
      handle.stop();
      option.errorCallback({ path: newPath });
      return;
    }
  }
}

type parsingOption = Partial<Option>;

export function parsing(roleModel: dataObject, checkTarget: dataObject, option: parsingOption): void {
  const handle = new Handle();

  const defaultOption: Option = {
    stringCallbakc: () => {
      return;
    },
    errorCallback: () => {
      return;
    },
  };

  if (!isDataObject(roleModel) || !isDataObject(checkTarget)) {
    throw new Error('not data object.');
  }
  child({ path: '', key: '', roleModel, checkTarget, option: { ...defaultOption, ...option }, handle });
}
