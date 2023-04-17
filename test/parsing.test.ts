import { parsing } from './../lib/parsing/main';

describe('parsing function', () => {
  it('コールバックがなくてもエラーにならない', () => {
    const setting = { id: 'number', name: 'string', age: 'number' };
    const data = { id: 1, name: 'tarou', age: 20 };
    parsing(setting, data, {});
  });
  it('探索出来る', () => {
    const setting = { id: 'number', name: 'string', age: 'number' };
    const data = { id: 1, name: 'tarou', age: 20 };
    parsing(setting, data, {
      stringCallbakc: (item) => {
        expect(item.checkTarget.value).toEqual(expect.any(String || Number) as string | number);
      },
    });
  });
  it('探索を途中で止めることが出来る', () => {
    const setting = { id: 'number', name: 'string', age: 'number' };
    const data = { id: 'hogehoge', name: 'tarou', age: 20 };
    parsing(setting, data, {
      stringCallbakc: (item, handle) => {
        expect(item.checkTarget.value).toEqual(expect.any(String) as string);
        if (item.path === 'name') handle.stop();
      },
    });
  });
  it('深い階層でも探索を途中で止めることが出来る', () => {
    const setting = { id: 'number', hoge: { fuga: { piyo: 'string' }, name: 'string' }, age: 'number' };
    const data = { id: 'hogehoge', hoge: { fuga: { piyo: 'string' }, name: 'hoge' }, age: 20 };
    parsing(setting, data, {
      stringCallbakc: (item, handle) => {
        expect(item.checkTarget.value).toEqual(expect.any(String) as string);
        if (item.key === 'piyo') handle.stop();
      },
    });
  });
  it('データ無しの場合はエラー', () => {
    const setting = { id: 'number', name: { last: 'string', first: 'string' }, age: 'number' };
    const data = { id: 'hogehoge', name: 'hoge', age: 20 };
    parsing(setting, data, {
      stringCallbakc: (item, handle) => {
        expect(item.checkTarget.value).toEqual(expect.any(String) as string);
        if (item.path === 'name') handle.stop();
      },
      errorCallback: (data) => {
        expect(data.path).toEqual(expect.any(String) as string);
        expect(data.errorMessage).toEqual(expect.any(String) as string);
      },
    });
  });
});
