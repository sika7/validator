import { child, dataObject, Handle, isDataObject, Option } from './exploration';

type explorationOption = Partial<Option>;

export function exploration(data: dataObject, option: explorationOption) {
  const handle = new Handle();

  const defaultOption: Option = {
    callback: () => {
      return;
    },
  };

  if (!isDataObject(data)) {
    throw new Error('not data object.');
  }
  child('', data, { ...defaultOption, ...option }, handle);
}
