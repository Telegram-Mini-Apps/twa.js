---
outline:
  - 2
  - 3
---

# 小程序

该组件提供其他系统
组件未涵盖的 Telegram 小程序 通用功能。

## 初始化

要初始化组件，请使用`initMiniApp`函数：

```typescript
import { initMiniApp } from '@telegram-apps/sdk';

const [miniApp] = initMiniApp();  
```

## 颜色

### 页眉(Header)

开发人员可以获取并更新 小程序的标题和背景颜色。 要获取
标题颜色的当前值，开发人员可参考 `headerColor` 属性，并通过
`setHeaderColor` 方法进行更新： 页眉

```typescript
miniApp.setHeaderColor('secondary_bg_color');
// or starting from v6.10:
miniApp.setHeaderColor('#aa1132');
```

### 背景

除了小程序的标题颜色，开发人员还可以调整其背景颜色：

```typescript
miniApp.setBgColor('#888311');
```

小程序背景色用于确定当前小程序是否为深色调。 要知道
当前调色板是否为暗色，开发人员应使用 `isDark` 属性： 要知道
当前是否为暗色，开发人员应使用 `isDark` 属性：

```typescript
console.log(miniApp.isDark); // false
```

## 访问请求

从 Telegram 小程序 6.9 版本开始，允许 小程序申请访问手机
号码和申请写入当前用户的权限。  为此，允许开发人员使用
`requestPhoneAccess` 和 `requestWriteAccess` 方法：

```typescript
miniApp.requestPhoneAccess().then(() => {
  // done.
});

miniApp.requestWriteAccess().then(() => {
  // done.
});
```

要请求联系信息（例如电话号码），请使用 `requestContact`
方法：

```typescript
miniApp.requestContact().then(contact => {
  console.log(contact);
  // Output:
  // {
  //   authDate: Date(...),
  //   hash: '...',
  //   contact: {
  //     firstName: '...',
  //     phoneNumber: '+38291789233',
  //   },
  // };
});
```

## 内联模式

小程序可在 [内联模式](https://core.telegram.org/bots/inline) 下启动。  建议尽早调用该方法，即在加载所有基本接口
元素后立即调用。 调用该方法后，加载占位符将被隐藏，小程序将显示出来。

```typescript
miniApp.switchInlineQuery('Show me something', ['users', 'groups']);
```

调用此方法时，Telegram 应用程序会发送机器人用户名和指定文本，以
用户选择的聊天内容。 可用聊天列表将受到第二个参数中指定的聊天类型
的限制。

要检查当前 小程序是否以内联模式启动，开发者应参考
`isBotInline` 属性：

```typescript
console.log(miniApp.isBotInline); // false
```

## 生命周期方法

### `ready`

通知 Telegram 应用程序已准备好显示小程序。

建议尽早调用该方法，即在加载所有基本接口
元素后立即调用。 调用该方法后，加载占位符将被隐藏，小程序将显示出来。

如果该方法未被调用，占位符只有在页面完全加载后才会被隐藏。

```typescript
miniApp.ready();
```

### `close`

关闭小程序。

```typescript
miniApp.close();
```

如果您想将应用程序打包到底部应用程序栏，但不想关闭它，请考虑使用第一个参数 `returnBack: boolean`。

```ts
// Will wrap the application into the bottom app bar.
miniApp.close(true);
```

## 其他方法

### `sendData`

用于向机器人发送数据的方法。 调用该方法时，会向
机器人发送一条服务消息，其中包含长度不超过 4096 字节的数据，然后关闭 小程序。 用于向机器人发送数据的方法。 调用该方法时，会向
机器人发送一条服务消息，其中包含长度不超过 4096 字节的数据，然后关闭 Mini App。 请参阅
[Message](https://core.telegram.org/bots/api#message) 类中的 `web_app_data` 字段。

## 事件

可被 [跟踪](#events) 的事件列表：

| 事件                   | 监听器                                      | 触发条件                 |
| -------------------- | ---------------------------------------- | -------------------- |
| `change`             | `() => void`                             | 组件中的某些部分发生了变化        |
| `change:bgColor`     | `(value: RGB) => void`                   | 更改了 `bgColor` 属性     |
| `change:headerColor` | `(value: HeaderColorKey or RGB) => void` | 更改了 `headerColor` 属性 |

## 方法支持 {#methods-support}

方法和参数列表，可在
[support checks](../components.md#methods-support) 中使用：`requestWriteAccess`, `requestPhoneAccess`,
`switchInlineQuery`, `setHeaderColor`, `setBgColor` 和 `setHeaderColor.color`.。
