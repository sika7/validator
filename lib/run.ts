import { conversionToAnObject, execute, parse } from './ast/objectToAst';

const data = { hoge: 'hoge', fuga: { hoge1: 'hoge1', hoge2: 'hoge2' } };
const result = execute(parse(data), (value) => {
  if (value.type === 'object') {
    value.children = [];
  }
  return value;
});
console.log("結果", conversionToAnObject(result));

export default parse;
