import { parsing, ParsingError } from './../lib/parsing/main';

describe('parsing function', () => {
  it('コールバックがなくてもエラーにならない', () => {
    const setting = { id: 'number', name: 'string', age: 'number' };
    const data = { id: 1, name: 'tarou', age: 20 };
    parsing(setting, data, {});
  });
  it('探索出来る', () => {
    const setting = { id: 'number', name: 'string', flug: 'bool' };
    const data = { id: 1, name: 'tarou', flug: false };
    const result: (string | number | boolean)[] = [];
    parsing(setting, data, {
      stringCallbakc: (item) => {
        result.push(item.checkTarget.value as string | number);
      },
    });
    expect(result).toEqual(expect.arrayContaining([expect.any(String || Number || Boolean) as string | number | boolean]));
  });
  it('探索を途中で止めることが出来る', () => {
    const setting = { id: 'number', name: 'string', age: 'number' };
    const data = { id: 'hogehoge', name: 'tarou', age: 20 };
    parsing(setting, data, {
      stringCallbakc: (item, handle) => {
        expect(item.checkTarget.value).toEqual(expect.any(String) as string);
        if (item.key === 'name') handle.stop();
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
    expect(() => {
      parsing(setting, data, {
        stringCallbakc: (item, handle) => {
          if (item.path === 'name') handle.stop();
        },
      });
    }).toThrowError(ParsingError);
  });
  it('コールバックのエラーはParsingErrorでラップ', () => {
    const setting = { id: 'number', name: { last: 'string', first: 'string' }, age: 'number' };
    const data = { id: 'hogehoge', name: 'hoge', age: 20 };
    expect(() => {
      parsing(setting, data, {
        stringCallbakc: () => {
          throw new Error('test');
        },
      });
    }).toThrowError(ParsingError);
  });
});
