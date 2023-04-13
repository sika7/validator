import { exploration } from './exploration/main';

const data = { hoge: 'hoge', fuga: { hoge1: 'hoge1', hoge2: 'hoge2', array: ['array', 'array2'] } };

exploration(data, {
  callback: (item, handle) => {
    console.log('結果', item);
    if (item.value === 'hoge') {
      handle.stop();
    }
  },
});

const data2 = [1, 2, 3, 4, [1, 2, 88, 4, 5], [6, 7, 8, 9]];
exploration(data2, {
  callback: (item, handle) => {
    console.log('結果', item);
    if (item.value === 88) {
      handle.stop();
    }
  },
});
