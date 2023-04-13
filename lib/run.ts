import { exploration } from './exploration/exploration';

// const data = { hoge: 'hoge', fuga: { hoge1: 'hoge1', hoge2: 'hoge2', array: ["array", "array2"] } };

const data = [1, 2, 3, 4, [1, 2, 3, 4, 5], [6, 7, 8, 9]];
exploration(data, {
  callback: (value) => {
    console.log('結果', value);
  },
});
