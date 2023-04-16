# 概要

このライブラリはいつくかのValidationのやり方を提供します。

これらを必要に応じて使用してください。

| Name | Description |
| --- | ----------- |
| [validation](./doc/) | bool値のみ返す 早い |
| [Validator](./doc/) | 複数チェック エラー概要付き |
| [DictionaryValidator](./doc/) | Validationをnamaで複数保持する |
| [ObjectValidator](./doc/) | Objectの設定値を見てObjectを検証する |

一番基本となるものはvalidation 関数です。

これはbool値のみを返します。

```ts
validation([isNumber()], 3); // result true
```

Validator はエラーメッセージを取得できます。

DictionaryValidatorはValidationを名前で保持できます。

ObjectValidatorはObjectの設定値を見てObjectを検証できます。

## pluginについて

ValidatePluginを作成したらぜひpluginにしてプルリクしてください。

取り込みます。


### 参加方法について

テストを./test/plugins/の中に作成してください。

またpluginの関数名とファイル名を一致させてください。


## テスト

下記のコマンドを実行すると確認できます。

```
npm i
npm run test
```

