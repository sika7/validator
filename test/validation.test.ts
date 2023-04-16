import { validation } from './../lib/validation';
import { isNumber } from './../lib/plugins/isNumber';

test('validation関数はエラーの場合trueを返す', () => {
  expect(validation([isNumber()], '3')).toBe(true);
});

test('validation関数はエラーなしの場合falseを返す', () => {
  expect(validation([isNumber()], 2)).toBe(false);
});
