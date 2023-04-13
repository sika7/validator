import { exploration } from './exploration/main';

const data = { hoge: 'hoge', fuga: { hoge1: 'hoge1', hoge2: 'hoge2', array: ['array', 'array2'] } };

// const data = [1, 2, 3, 4, [1, 2, 3, 4, 5], [6, 7, 8, 9]];
exploration(data, {
  callback: (value, handle) => {
    console.log('結果', value);
    if (value.value === 'hoge') {
      handle.stop();
    }
  },
});

exploration(data, {
  callback: (value, handle) => {
    console.log('結果', value);
    if (value.value === 'array') {
      handle.stop();
    }
  },
});
