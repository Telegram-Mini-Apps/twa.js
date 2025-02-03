---
outline:
  - 2
  - 3
---

# `启动数据`

负责执行 Telegram Mini
Apps [初始数据](../../../../.platform/init-data.md) 的组件。

## 初始化

要初始化组件，请使用 `initInitData` 函数：

```typescript
import { initInitData } from '@telegram-apps/sdk';

const initData = initInitData()；
```

## 属性

### `authDate`

Type: `Date`

初始数据生成日期。

### `canSendAfter`

Type: `number`, _optional_

通过方法 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 发送消息后的秒数。

### `canSendAfterDate`

Type: `Date`, _optional_

允许调用 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 方法的日期。

### `chat`

Type: [`Chat`](../init-data/chat.md), _optional_

包含通过附件菜单启动机器人的聊天数据的对象。
包含通过附件菜单启动机器人的聊天数据的对象。
返回超级群组、频道和群组聊天 - 仅适用于通过附件
菜单启动的小程序。

### `chatType`

Type: `'sender' | 'private' | 'group' | 'supergroup' | 'channel' | string`, _optional_

打开 小程序的聊天类型。

### `chatInstance`

Type: `string`, _optional_

全局标识符，表示打开 小程序的聊天窗口。  仅返回通过直接链接打开的
申请表。

### `hash`

Type: `string`

所有传入参数的哈希值，机器人服务器可以用它来检查
它们的[有效性](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app)。

### `queryId`

Type: `string`, _optional_

小程序会话的唯一标识符，通过 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 方法发送
消息时需要使用到。

### `receiver`

Type: [`User`](../init-data/user.md), _optional_

一个对象，包含当前用户在聊天中的聊天伙伴数据，机器人是通过附件菜单
启动的。 仅针对私人聊天返回，并且仅针对通过附件菜单启动的小程序。

### `startParam`

Type: `string`, _optional_

通过链接传递的 `startattach` 参数的值。  一个对象，包含当前用户在聊天中的聊天伙伴数据，机器人是通过附件菜单
启动的。 仅对私人聊天和通过附件菜单启动的小程序
返回。

### `user`

Type: [`User`](../init-data/user.md), _optional_

包含当前用户数据的对象。
