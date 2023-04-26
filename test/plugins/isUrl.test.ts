import { isUrl } from '../../lib/plugins/isUrl';
import { validator } from '../../lib/validator';

describe('isUrl', () => {
  const v = validator([isUrl()]);
  it('urlの文字列以外はtrueを返す', () => {
    expect(v.validation(9)).toBe(true);
    expect(v.validation(new Date())).toBe(true);
    expect(v.validation(undefined)).toBe(true);
    expect(v.validation(null)).toBe(true);
    expect(v.validation("hogehoge")).toBe(true);
    expect(
      v.validation(() => {
        return false;
      })
    ).toBe(true);
  });

  it('urlの場合falseを返す', () => {
    expect(v.validation('https://github.com')).toBe(false);
  });

  it('エラーの場合Messageを返す', () => {
    v.validation(3);

    expect(v.getErrorMessage()).toEqual({
      value: 3,
      validates: ['url'],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });
});
