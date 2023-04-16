import { DictionaryValidator } from './../lib/dictionaryValidator';
import { isNumber } from './../lib/plugins/isNumber';

const _undefined = void 0;

describe('DictionaryValidator', () => {
  describe('use', () => {
    it('プラグインを登録出来る', () => {
      const validator = new DictionaryValidator();
      expect(validator.use(isNumber())).toBe(_undefined);
    });
    it('同じ名前のプラグインはエラー', () => {
      const validator = new DictionaryValidator();
      validator.use(isNumber());
      expect(() => validator.use(isNumber())).toThrow('Already registered.');
    });
  });

  describe('validation', () => {
    const validator = new DictionaryValidator();
    validator.use(isNumber());

    it('バリデータなしの場合はエラー', () => {
      expect(() => validator.validation('string', 'text')).toThrow('validator not found.');
    });

    it('エラーの場合は詳細を返す', () => {
      expect(validator.validation('number', 'text')).toEqual({
        validateName: 'number',
        errorMessage: expect.any(String) as string,
      });
    });

    it('エラーなしの場合は何も返さない', () => {
      expect(validator.validation('number', 3)).toBe(_undefined);
    });
  });
});
