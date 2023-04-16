import { validation } from './../lib/validation';
import { isNumber } from './../lib/plugins/isNumber';

test('two plus two is four', () => {
  expect(validation([isNumber()], 2)).toBe(true);
});
