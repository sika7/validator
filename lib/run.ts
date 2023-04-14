import { ObjectValidator } from './objectValidator';
import { isNumber } from './plugins/isNumber';

const data = {
  hoge: 'number',
};
const data2 = { hoge: 2 };

const v = new ObjectValidator();
v.use(isNumber());

console.log('結果', v.validation(data, data2));

