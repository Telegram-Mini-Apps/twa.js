# `云存储`

执行与 Telegram 小程序云存储相关的功能。

## 初始化

要初始化组件，请使用`initCloudStorage`函数：

```typescript
import { initCloudStorage } from '@telegram-apps/sdk';

const cloudStorage = initCloudStorage();  
```

## 设置项目

要在云存储中保存一个值，需要使用 `set` 方法：

```typescript
cloudStorage
  .set('my-key', 'my-value')
  .then(() => console.log('Item saved'));
```

## 获取项目

要按键获取值，需要使用 `get` 方法，该方法可获取单个字符串
值和字符串值数组：

::: code-group

```typescript [Single value]
cloudStorage
  .get('my-key')
  .then((value) => {
    console.log(value);
    // Output: 'my-value'
  });

cloudStorage
  .get('non-existent')
  .then((value) => {
    console.log(value);
    // Output: ''
  });
```

```typescript [Array of values]
cloudStorage
  .get(['my-key', 'non-existent'])
  .then((result) => {
    console.log('Result is', result);
    // Output:
    // {
    //   'my-key': 'my-value',
    //   'non-existent': ''
    // }
  });
```

:::

对于云存储中不存在的键，该方法会返回空字符串。

## 获取键

要检索云存储中的所有的键，需要使用 `getKeys` 方法：

```typescript
cloudStorage
  .getKeys()
  .then((keys) => {
    // Will be ['my-key'].
    console.log('Keys are', keys);
  })
```

## 删除项目

要删除云存储中的项目，需要使用 `delete` 方法。  这种方法允许
删除单个和多个项目：

::: code-group

```typescript [Single item]
cloudStorage
  .delete('my-key')
  .then(() => console.log('Key was deleted'));
```

```typescript [Multiple items]
cloudStorage
  .delete(['my-key', 'another-key'])
  .then(() => console.log('Keys were deleted'));
```

:::

## 方法支持

方法列表，可用于 [支持检查](#methods-support)：`delete`、`get`、`getKeys` 和 `set`。
