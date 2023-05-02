import { ObjectValidator } from 'objectValidator';
import { isNumber } from 'plugins/isNumber';

// const data = {
//   hoge: 'number',
// };
// const data2 = { hoge: 2 };

const validator = new ObjectValidator();
validator.use(isNumber());

const setting = {
  id: 'string|number',
};
console.log(validator.validation(setting, { id: 3 }));

// console.log('結果', v.validation(data, data2));
//
