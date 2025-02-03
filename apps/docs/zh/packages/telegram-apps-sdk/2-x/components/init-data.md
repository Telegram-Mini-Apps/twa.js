---
outline:
  - 2
  - 3
---

# 初始数据

负责 Telegram Mini
Apps [init data](../../../../platform/init-data.md) 的💠[组件](../scopes.md)。

## 恢复

要恢复组件状态，请使用 `restore` 方法。

::: code-group

```ts [Variable]
import { initData } from '@telegram-apps/sdk';

initData.restore();
```

```ts [Functions]
import { restoreInitData } from '@telegram-apps/sdk';

restoreInitData();
```

:::

## 解析

要将值解析为初始数据，请使用 `parseInitData` 函数。

```ts
import { parseInitData } from '@telegram-apps/sdk';

const initData = parseInitData();
// {
//   user: {
//     id: 99281932,
//     firstName: 'Andrew',
//     lastName: 'Rogue',
//     username: 'rogue',
//     languageCode: 'en',
//     isPremium: true,
//     allowsWriteToPm: true,
//   },
//   hash: 'abcedef123',
//   authDate: Date(1716922846000),
//   startParam: 'debug',
//   chatType: 'sender',
//   chatInstance: '8428209589180549439',
// };
```

该函数返回 [init data](../../../../platform/init-data.md#parameters-list) 对象
，其中包含深驼峰型属性。

## 信号(Signals)

本节提供了与启动数据有关的信号的完整列表。

### `authDate`

Return type: `Date | undefined`

初始化数据的创建日期。

::: code-group

```ts [Variable]
initData.authDate(); // Date(1727368894000)
```

```ts [Functions]
import { initDataAuthDate } from '@telegram-apps/sdk';

initDataAuthDate(); // Date(1727368894000)
```

:::

### `canSendAfter`

Return type: `number | undefined`

通过
方法 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 发送信息的秒数。

::: code-group

```ts [Variable]
initData.canSendAfter(); // 3600
```

```ts [Functions]
import { initDataCanSendAfter } from '@telegram-apps/sdk';

initDataAuthDate(); // 3600
```

:::

### `canSendAfterDate`

Return type: `Date | undefined`

[canSendAfter](#cansendafter)，但作为日期。

::: code-group

```ts [Variable]
initData.canSendAfterDate(); // Date(1727368897600)
```

```ts [Functions]
import { initDataCanSendAfterDate } from '@telegram-apps/sdk';

initDataCanSendAfterDate(); // Date(1727368897600)
```

:::

### `chat`

返回类型：`undefined` 或 [`Chat`](../../../../platform/init-data.md#chat)，带驼峰形
属性。

包含通过附件菜单启动机器人的聊天数据的对象。

> [!NOTE]
> 返回超级群组、频道和群组聊天记录 - 仅适用于通过
> 附件菜单启动的小程序。

::: code-group

```ts [Variable]
initData.chat();
// {
//   id: 7728725378876215,
//   type: 'group',
//   title: '@BotFather',
//   photoUrl: 'https://example.com/image.png',
//   username: 'botfather'
// }
```

```ts [Functions]
import { initDataChat } from '@telegram-apps/sdk';

initDataChat();
// {
//   id: 7728725378876215,
//   type: 'group',
//   title: '@BotFather',
//   photoUrl: 'https://example.com/image.png',
//   username: 'botfather'
// }
```

:::

### `chatType`

Return type: `string | undefined`

打开小程序的聊天类型。  值：

- `sender`
- `private`
- `group`
- `supergroup`
- `channel`

> [!NOTE]
> 仅返回通过直接链接打开的申请。

::: code-group

```ts [Variable]
initData.chatType(); // 'group'
```

```ts [Functions]
import { initDataChatType } from '@telegram-apps/sdk';

initDataChatType(); // 'group'
```

:::

### `chatInstance`

Return type: `string | undefined`

全局标识符，表示打开小程序的聊天窗口。

> [!WARNING]
> 仅返回通过直接链接打开的应用程序。

::: code-group

```ts [Variable]
initData.chatInstance(); // 'group'
```

```ts [Functions]
import { initDataChatInstance } from '@telegram-apps/sdk';

initDataChatInstance(); // '899667289674387257'
```

:::

### `hash`

Return type: `string | undefined`

初始化数据签名。

::: code-group

```ts [Variable]
initData.hash(); // 'group'
```

```ts [Functions]
import { initDataHash } from '@telegram-apps/sdk';

initDataHash(); // 'sgbbc62g3bvdhg3djsaasd'
```

:::

### `queryId`

Return type: `string | undefined`

小程序的唯一会话 ID。 小程序的唯一会话 ID。 在
通过
方法 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 发送信息的过程中使用。

::: code-group

```ts [Variable]
initData.queryId(); // 'group'
```

```ts [Functions]
import { initDataQueryId } from '@telegram-apps/sdk';

initDataQueryId(); // 'ssVXZ231ger'
```

:::

### `raw`

Return type: `string | undefined`

初始化数据的原始字符串。

::: code-group

```ts [Variable]
initData.raw(); // 'user=...&chat=...&...'
```

```ts [Functions]
import { initDataRaw } from '@telegram-apps/sdk';

initDataRaw(); // 'user=...&chat=...&...'
```

:::

### `receiver`

返回类型：`undefined` 或 [`User`](../../../../platform/init-data.md#user)，带驼峰形
属性。

一个对象，包含当前用户在
聊天时的聊天伙伴数据，机器人是通过附件菜单启动的。

> [!NOTE]
> 仅对私人聊天和通过附件菜单启动的小程序返回。

::: code-group

```ts [Variable]
initData.user();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

```ts [Functions]
import { initDataUser } from '@telegram-apps/sdk';

initDataUser();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

:::

### `state`

返回类型：`undefined` 或 [`InitData`](../../../../platform/init-data.md#parameters-list)，带有
深驼峰型属性。

包含对象格式初始化数据的对象。

::: code-group

```ts [Variable]
initData.state();
```

```ts [Functions]
import { initDataState } from '@telegram-apps/sdk';

initDataState();
```

:::

### `startParam`

Return type: `string | undefined`

链接中指定的 `startattach` 或 `startapp` 查询参数的值。

::: code-group

```ts [Variable]
initData.startParam(); // 'my-value'
```

```ts [Functions]
import { initDataStartParam } from '@telegram-apps/sdk';

initDataStartParam(); // 'my-value'
```

:::

### `user`

返回类型：`undefined` 或 [`User`](../../../../platform/init-data.md#user)，带驼峰形
属性。

包含当前用户信息的对象。

::: code-group

```ts [Variable]
initData.user();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

```ts [Functions]
import { initDataUser } from '@telegram-apps/sdk';

initDataUser();
// {
//   addedToAttachmentMenu: false,
//   allowsWriteToPm: true,
//   isPremium: true,
//   firstName: 'Pavel',
//   id: 78262681,
//   isBot: false,
//   lastName: 'Durov',
//   languageCode: 'ru',
//   photoUrl: 'https://example.com/image.png',
//   username: 'durove',
// }
```

:::
