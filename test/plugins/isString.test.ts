import { isString } from '../../lib/plugins/isString';
import { validator } from '../../lib/validator';

describe('isString', () => {
  const v = validator([isString()]);
  it('文字列以外はtrueを返す', () => {
    expect(v.validation(9)).toBe(true);
    expect(v.validation(new Date())).toBe(true);
    expect(
      v.validation(() => {
        return false;
      })
    ).toBe(true);
  });

  it('文字列の場合falseを返す', () => {
    expect(v.validation('text...')).toBe(false);
  });

  it('エラーの場合Messageを返す', () => {
    v.validation(3);

    expect(v.getErrorMessage()).toEqual({
      value: 3,
      validates: ['string'],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });
});
