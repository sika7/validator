import { isNumber } from '../../lib/plugins/isNumber';
import { validator } from '../../lib/validator';

describe('isNumber', () => {
  const v = validator([isNumber()]);
  it('数値以外はtrueを返す', () => {
    expect(v.validation('3')).toBe(true);
    expect(v.validation(new Date())).toBe(true);
    expect(
      v.validation(() => {
        return false;
      })
    ).toBe(true);
  });

  it('数値の場合falseを返す', () => {
    expect(v.validation(999)).toBe(false);
  });

  it('エラーの場合Messageを返す', () => {
    v.validation('text');

    expect(v.getErrorMessage()).toEqual({
      value: 'text',
      validates: ['number'],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });
});
