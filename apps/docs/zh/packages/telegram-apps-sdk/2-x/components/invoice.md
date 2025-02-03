# 支付请求

负责
Telegram [支付请求](https://core.telegram.org/bots/payments#introducing-payments-2-0) 的💠[组件](./scopes.md)。

## 检查支持

要检查当前 Telegram 小程序版本是否支持支付请求，需要使用
`isSupported` 方法：

::: code-group

```ts [Variable]
import { invoice } from '@telegram-apps/sdk';

invoice.isSupported(); // boolean
```

```ts [Functions]
import { isInvoiceSupported } from '@telegram-apps/sdk';

isInvoiceSupported(); // boolean
```

:::

## 打开

要打开支付请求，需要使用 `open` 方法。 这种方法允许使用支付请求的 URL 或 slug 打开支付请求
。 该方法允许通过 URL 或 slug 打开支付请求。

在 URL 模式下开支付请求需要传递等于 `url` 的第二个参数，因此
方法会将传递的值解释为 URL。

调用该方法会更新 `isOpened` 信号属性值。

::: code-group

```ts [Variable]
import { invoice } from '@telegram-apps/sdk';

if (invoice.open.isAvailable()) {
  invoice.isOpened(); // false
  const promise = invoice.open('abIIks213');
  invoice.isOpened(); // true
  const status = await promise;
  invoice.isOpened(); // false

  // Or in URL mode:
  await invoice.open('https://t.me/invoice/abIIks213', 'url');
}
```

```ts [Functions]
import { openInvoice, isInvoiceOpened } from '@telegram-apps/sdk';

if (openInvoice.isAvailable()) {
  isInvoiceOpened(); // false
  const promise = openInvoice('abIIks213');
  isInvoiceOpened(); // true
  const status = await promise;
  isInvoiceOpened(); // false

  // Or in URL mode:
  await openInvoice('https://t.me/invoice/abIIks213', 'url');
}
```

:::
