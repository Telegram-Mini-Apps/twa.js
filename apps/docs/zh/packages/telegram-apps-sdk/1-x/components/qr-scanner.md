# `QRScanner`

提供 QR 扫描仪功能的组件。

## 初始化

要初始化组件，请使用 `initQRScanner` 函数：

```typescript
import { initQRScanner } from '@telegram-apps/sdk';

const qrScanner = initQRScanner();  
```

## 打开和关闭 {#opening-and-closing}

要打开 QR 扫描仪，开发人员应使用 `open` 方法：

```typescript
qrScanner.open('Scan QR code').then((content) => {
  console.log(content);
  // Output: 'some-data=22l&app=93...'
});
console.log(qrScanner.isOpened); // true
```

因此，方法返回一个 Promise，当扫描到某个二维码时，该 Promise 将被解析。 如果扫描仪已关闭，也可能解析为`null`。

可以传递一个包含可选属性 `text` 和 `capture` 的对象，`text` 用于在二维码扫描器中显示文本，`capture` 用于确定是否应捕获扫描到的二维码并解析 Promise。

```ts
qrScanner.open({ 
  text: 'Scan QR code',
  capture({ data }) {
    // Capture QRs contanining Telegram user link.
    return data.startsWith('https://t.me');
  }
}).then((qr) => {
  // May be something like 'https://t.me/heyqbnk' or null.
  console.log(qr);
});
```

要关闭扫描仪，请使用 `close` 方法：

```typescript
qrScanner.close();
console.log(qrScanner.isOpened); // false
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                | 监听器                        | 触发条件              |
| ----------------- | -------------------------- | ----------------- |
| `change`          | `() => void`               | 组件中的某些部分发生了变化     |
| `change:isOpened` | `(value: boolean) => void` | 更改了 `isOpened` 属性 |

## 方法支持 {#methods-support}

方法列表，可用于 [支持检查](#methods-support)：`open` 和 `close`
