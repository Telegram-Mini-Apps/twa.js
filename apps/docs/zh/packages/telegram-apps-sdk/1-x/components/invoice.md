# 支付请求

实现 Telegram [支付请求](https://core.telegram.org/bots/payments#introducing-payments-2-0)
功能。

## 初始化

要初始化组件，请使用`initInvoice`函数：

```typescript
import { initInvoice } from '@telegram-apps/sdk';

const invoice = initInvoice();  
```

## 打开支付请求

要打开支付请求，需要使用 `open` 方法。
。 该方法允许通过 URL 或 slug 打开支付请求。

在 URL 模式下开支付请求需要传递等于 `url` 的第二个参数，因此
方法会将传递的值解释为 URL。

若要将传递的值解释为 slug，请省略第二个参数。

::: code-group

```typescript [Using slug]
invoice
  .open('abIIks213')
  .then((status) => {
    // Output: 'paid'
    return console.log(status);
  });
```

```typescript [Using URL]
invoice
  .open('https://t.me/invoice/abIIks213', 'url')
  .then((status) => {
    // Output: 'paid'
    return console.log(status);
  });
```

:::

::: info

请注意，slug 是字符串的一部分，位于 `$` 符号之后。 因此，在获得 Telegram Bot API 返回的 `$abcdefghi` 值后，必须使用 `abcdefghi` 值或完整的 URL(https://t.me/invoice/abcdefghi 或 https://t.me/$abcdefghi)调用 `open` 方法。

:::

## 事件

可被 [跟踪](#events) 的事件列表：

| 事件                | 监听器                        | 触发条件              |
| ----------------- | -------------------------- | ----------------- |
| `change`          | `() => void`               | 组件中的某些部分发生了变化     |
| `change:isOpened` | `(value: boolean) => void` | 更改了 `isOpened` 属性 |

## 方法支持

可用于[支持检查](#methods-support)的方法列表：`open`
