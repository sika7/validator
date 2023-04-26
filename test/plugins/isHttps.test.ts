import { isHttps } from '../../lib/plugins/isHttps';
import { validator } from '../../lib/validator';

describe('isHttps', () => {
  const v = validator([isHttps()]);
  it('数値以外はtrueを返す', () => {
    expect(v.validation('url')).toBe(true);
    expect(v.validation(new Date())).toBe(true);
    expect(
      v.validation(() => {
        return false;
      })
    ).toBe(true);
  });

  it('数値の場合falseを返す', () => {
    expect(v.validation('https://github.com')).toBe(false);
  });

  it('エラーの場合Messageを返す', () => {
    v.validation('text');

    expect(v.getErrorMessage()).toEqual({
      value: 'text',
      validates: ['https'],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });
});
