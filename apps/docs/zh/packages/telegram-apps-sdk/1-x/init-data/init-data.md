# `InitData`

### `authDate`

Type: `Date`

初始数据生成日期。

### `canSendAfter`

Type: `number`, _optional_

通过
方法 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 发送信息的秒数

### `chat`

Type: [`Chat`](chat.md), _optional_

包含通过
附件菜单启动机器人的聊天数据的对象。 包含通过
附件菜单启动机器人的聊天数据的对象。 返回超级群组、频道和群组
聊天 - 仅适用于通过附件菜单启动的小程序。

### `chatType`

Type: `'sender' | 'private' | 'group' | 'supergroup' | 'channel' | string`, _optional_

打开 小程序的聊天类型。

### `chatInstance`

Type: `string`, _optional_

一个全局标识符，表明小程序是从
打开的聊天。 仅返回通过直接链接打开的申请表。 仅返回通过直接链接打开的申请表。

### `hash`

Type: `string`

所有传入参数的哈希值，机器人服务器可以用它来检查
它们的[有效性](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app)。

### `queryId`

Type: `string`, _optional_

小程序会话的唯一标识符，通过 [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) 方法发送
消息时需要使用。

### `receiver`

Type: [`User`](user.md), _optional_

一个对象，包含当前用户在
聊天时的聊天伙伴数据，机器人是通过附件菜单启动的。
仅对私人聊天和通过附件菜单启动的小程序
返回。

### `startParam`

Type: `string`, _optional_

通过链接传递的 `startattach` 参数的值。  仅对私人聊天和通过附件菜单启动的小程序
返回。

### `user`

Type: [`User`](user.md), _optional_

包含当前用户数据的对象。
