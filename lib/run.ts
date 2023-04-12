import { parse } from './ast/objectToAst';
console.log(parse({ hoge: 'hoge' }));

export default parse;
