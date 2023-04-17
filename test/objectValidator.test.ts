import { ObjectValidator } from './../lib/objectValidator';
import { isNumber } from './../lib/plugins/isNumber';

const _undefined = void 0;
describe('DictionaryValidator', () => {
  describe('use', () => {
    it('プラグインを登録出来る', () => {
      const validator = new ObjectValidator();
      expect(validator.use(isNumber())).toBe(_undefined);
    });
    it('同じ名前のプラグインはエラー', () => {
      const validator = new ObjectValidator();
      validator.use(isNumber());
      expect(() => validator.use(isNumber())).toThrow('Already registered.');
    });
  });

  describe('validation', () => {
    const validator = new ObjectValidator();
    validator.use(isNumber());

    it('設定値がstring以外は無視する', () => {
      const setting = {
        id: 1,
        age: 'number'
      };
      expect(validator.validation(setting, { id: 1, age: 3 })).toBe(_undefined);
    });

    it('バリデータなしの場合はエラー', () => {
      const setting = {
        id: 'string|number',
      };
      expect(validator.validation(setting, { id: 3 })).toEqual({
        path: expect.any(String) as string,
        validateName: 'string',
        errorMessage: 'validator not found.',
      });
    });

    it('データがない場合はエラー', () => {
      const setting = {
        id: 'number',
        age: 'number',
      };
      expect(validator.validation(setting, { id: 3 })).toEqual({
        path: expect.any(String) as string,
        validateName: '',
        errorMessage: expect.any(String) as string,
      });
    });

    it('エラーの場合は詳細を返す', () => {
      const setting = {
        name: 'number',
      };
      expect(validator.validation(setting, { name: 'hoge' })).toEqual({
        path: expect.any(String) as string,
        validateName: 'number',
        errorMessage: expect.any(String) as string,
      });
    });

    it('エラーなしの場合は何も返さない', () => {
      const setting = {
        id: 'number',
      };
      expect(validator.validation(setting, { id: 3 })).toBe(_undefined);
    });
  });
});
