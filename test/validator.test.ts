import { Validator, validator } from './../lib/validator';
import { isNumber } from './../lib/plugins/isNumber';

describe('validator', () => {
  it('validator関数はValidatorインスタンスを返す', () => {
    expect(validator([isNumber()])).toBeInstanceOf(Validator);
  });
});

describe('Validator', () => {
  const v = validator([isNumber()]);

  it('validationはエラーの場合trueを返す', () => {
    expect(v.validation('number')).toBe(true);
  });

  it('validationはエラーなしの場合falseを返す', () => {
    expect(v.validation(0)).toBe(false);
  });

  it('getErrorMessageでエラーMessageを返す', () => {
    v.validation('text');

    expect(v.getErrorMessage()).toEqual({
      value: 'text',
      validates: ['number'],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });

  it('getErrorMessageはエラーなしの場合何も返さない', () => {
    v.validation(3);

    expect(v.getErrorMessage()).not.toEqual({
      value: 'text',
      validates: expect.arrayContaining([expect.any(String) as string]) as string[],
      message: expect.arrayContaining([expect.any(String) as string]) as string[],
    });
  });
});
