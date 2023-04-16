
# validation function

bool値のみを返します。

チェックに不合格の時点で処理が終了します。

```ts
validation([isNumber(), isString()], 'number'); // false
```




