# `实用工具`

执行不需要状态且无法分类的功能。

## 初始化

要初始化组件，请使用 `initUtils` 函数：

```typescript
import { initUtils } from '@telegram-apps/sdk';

const utils = initUtils();  
```

## 链接

### `openLink`

`MiniApp` 类能够打开不同类型的链接。 `MiniApp` 类能够打开不同类型的链接。 例如，它可以使用 `openLink` 方法在不关闭当前 小程序的情况下在外部浏览器中打开链接
：

```typescript
utils.openLink('https://google.com');
```

在可能的情况下，此方法还允许使用
Telegram 的 [Instant View](https://instantview.telegram.org/) 打开链接：

```typescript
utils.openLink('https://google.com', { tryInstantView: true });
```

要尝试使用用户首选浏览器打开链接，请使用 `tryBrowser` 选项：

```typescript
utils.openLink('https://google.com', { tryBrowser: true });
```

### `openTelegramLink`

如果开发人员想打开与 Telegram 相关的链接（以 `https://t.me` 开头）
，可使用 `openTelegramLink` 方法。

使用这种方法，Telegram 应用程序将自行处理此类链接：

```typescript
utils.openTelegramLink('https://t.me/heyqbnk');
```

### `shareURL`

共享 URL 是小程序中的一项常见功能。 共享 URL 是小程序中的一项常见功能。 要实现这一点，开发人员可以使用
shareURL 方法，该方法接受要共享的 URL 和可选文本，以附加到 URL 之后的消息
。

调用时，它会打开聊天选择器以共享 URL。

```ts
utils.shareURL('https://t.me/mybot/myapp', 'Look! Some cool app here!');
```

::: warning

目前，还没有直接共享任何内容的本地方法。 因此，该方法利用了
[openTelegramLink](#opentelegramlink) 方法，该方法在被调用后会关闭应用程序。  该方法在底层使用了 [分享链接](https://core.telegram.org/api/links#share-links)。

:::

## 剪贴板

开发人员可以使用 `readTextFromClipboard`
方法从剪贴板读取文本。

该方法从剪贴板读取文本，并返回字符串或空值。  在这些情况下返回空值：

- 剪贴板中的值不是文本。
- 不允许访问剪贴板。

```typescript
utils.readTextFromClipboard().then((data) => {
  console.log('Clipboard data:', data);
  // Output: string or null
});
```

## 方法支持 {#methods-support}

方法和参数列表，可用于
[支持检查](#methods-support)：`readTextFromClipboard`
和 `openLink.tryInstantView`
