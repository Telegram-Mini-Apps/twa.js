# Environment

此软件包只能在 Telegram 应用程序中使用。 由于非 Telegram
环境缺乏 Telegram 特有的特性，调用
[retrieveLaunchParams](launch-parameters.md) 或 [postEvent](methods.md#postevent) 等方法将导致
错误。

不过，该软件包提供的实用工具可以帮助开发人员在 Telegram 之外开发应用程序
，或者确定当前环境是否根本不是 Telegram 小程序。

## `isTMA`

要检查当前环境是否为 Telegram 小程序，开发人员可以使用 `isTMA` 函数。
它有两种工作模式：**简单** 和 **完整**。
它有两种模式：**简单** 和 **完整**。

### 简单

在这种模式下，函数会尝试从环境中获取启动参数。

如果提取成功，该环境将被视为 Telegram 小程序。
简单模式是同步模式，返回一个布尔值。
简单模式是同步模式，返回一个布尔值。

```ts
import { isTMA } from '@telegram-apps/bridge';

if (isTMA('simple')) {
  console.log('It\'s Telegram小程序');
}
```

这种模式略显肤浅，但仍可满足大多数应用的需要。 要进行更可靠的检查，请使用 [complete](#complete) 模式。

### 完整 {#complete}

在这种模式下，函数会调用 Telegram 小程序 特有的方法，并等待
方法特有的事件发生。

```ts
import { isTMA } from '@telegram-apps/bridge';

if (await isTMA()) {
  console.log('It\'s Telegram小程序');
}
```

函数等待事件的时间为 100 毫秒，但开发人员可以通过传递带有 `timeout: number` 属性的对象来更改时间
。

```ts
if (await isTMA({ timeout: 50 })) {
  console.log('It\'s Telegram小程序');
}
```

## `mockTelegramEnv`

该软件包提供了 `mockTelegramEnv` 函数，可模仿
Telegram 提供的环境。 该软件包提供了 `mockTelegramEnv` 函数，可模仿
Telegram 提供的环境。 它可以帮助开发人员在
[BotFather](https://t.me/botfather) 中创建小程序记录，甚至无需创建记录即可开始构建应用程序。

此函数接受原始或解析格式的启动参数。 下面就是一个例子：

```ts
mockTelegramEnv({
  themeParams: {
    accentTextColor: '#6ab2f2',
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    destructiveTextColor: '#ec3942',
    headerBgColor: '#17212b',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    sectionBgColor: '#17212b',
    sectionHeaderTextColor: '#6ab3f3',
    subtitleTextColor: '#708499',
    textColor: '#f5f5f5',
  },
  initData: {
    user: {
      id: 99281932,
      firstName: 'Andrew',
      lastName: 'Rogue',
      username: 'rogue',
      languageCode: 'en',
      isPremium: true,
      allowsWriteToPm: true,
    },
    hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
    authDate: new Date(1716922846000),
    startParam: 'debug',
    chatType: 'sender',
    chatInstance: '8428209589180549439',
  },
  initDataRaw: new URLSearchParams([
    ['user', JSON.stringify({
      id: 99281932,
      first_name: 'Andrew',
      last_name: 'Rogue',
      username: 'rogue',
      language_code: 'en',
      is_premium: true,
      allows_write_to_pm: true,
    })],
    ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
    ['auth_date', '1716922846'],
    ['start_param', 'debug'],
    ['chat_type', 'sender'],
    ['chat_instance', '8428209589180549439'],
  ]).toString(),
  version: '7.2',
  platform: 'tdesktop',
});
```

> [!WARNING]
> 该函数仅模仿 Telegram 环境行为。  它不会发送任何真正的
> 请求，也不会执行只能在 Telegram 应用程序中看到的操作。
