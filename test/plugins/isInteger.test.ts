import { isInteger } from '../../lib/plugins/isInteger';
import { validator } from '../../lib/validator';

describe('isInteger', () => {
  const v = validator([isInteger()]);
  it('整数値以外はtrueを返す', () => {
    expect(v.validation('url')).toBe(true);
    expect(v.validation(NaN)).toBe(true);
    expect(v.validation(Infinity)).toBe(true);
    expect(v.validation(new Date())).toBe(true);
    expect(
      v.validation(() => {
        return false;
      })
    ).toBe(true);
  });

  it('数値の場合falseを返す', () => {
    expect(v.validation(3)).toBe(false);
  });

  it('エラーの場合Messageを返す', () => {
    v.validation('text');

    expect(v.getErrorMessage()).toEqual({
      value: 'text',
      validates: ['integer'],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });
});
