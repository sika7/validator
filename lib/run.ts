import { execute, parse } from './ast/objectToAst';

const data = { hoge: 'hoge', fuga: { hoge1: 'hoge1', hoge2: 'hoge2' } };
execute(parse(data), (value) => {
  console.log(value);
  if (value.type === 'object') {
    value.children = [];
  }
  return value;
});

export default parse;
