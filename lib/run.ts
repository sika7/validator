import { parsing } from './parsing/main';

const data = {
  hoge: 'hoge',
  fuga: {
    hoge1: 'hoge1',
    hoge2: 'hoge2',
    array: {
      piyo: 'piyo',
      piyo2: 'piyo2',
    },
  },
};
const data2 = { hoge: 'hoge', fuga: { hoge1: 'hoge1', hoge2: 'hoge2', array: ['array', 'array2'] } };

parsing(data, data2, {
  stringCallbakc: (item) => {
    console.log('結果', item.checkTarget.value);
    // if (item.checkTarget.value === 'hoge') {
    //   handle.stop();
    // }
  },
  errorCallback: ({ path }) => {
    console.log(`${path}が検証データにありませんでした`);
    return;
  },
});
