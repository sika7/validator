# 概要

このライブラリはいつくかのValidationのやり方を提供します。

| Name | Description |
| --- | ----------- |
| [validation](./doc/) | bool値のみ返す 早い |
| [Validator](./doc/) | 複数チェック エラー概要付き |
| [DictionaryValidator](./doc/) | Validationをnamaで複数保持する |
| [ObjectValidator](./doc/) | Objectの設定値を見てObjectを検証する |

これらを必要に応じて使用してください。


一番基本となるものはvalidation 関数です。

これはbool値のみを返します。

```ts
validation([isNumber()], 3); // result true
```

Validator はエラーメッセージを取得できます。

```ts
validation([isNumber()]);
```


