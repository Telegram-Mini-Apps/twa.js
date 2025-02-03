# 启动参数

本节 SDK 涵盖与
[launch parameters](../../../platform/launch-parameters.md) 相关的主题。

## 解析

要解析作为启动参数的值，软件包提供了 `parseLaunchParams` 方法。
方法接受以字符串或 `URLSearchParams` 实例形式呈现的查询参数，并返回
`LaunchParams` 接口。 如果传递的数据无效，则会出错。 方法接受以字符串或 `URLSearchParams` 实例形式呈现的查询参数，并返回
`LaunchParams` 接口。 如果传递的数据无效，则会出错。

::: code-group

```typescript [Usage example]
import { parseLaunchParams, launchParamsParser } from '@telegram-apps/sdk';

parseLaunchParams(
  new URLSearchParams([
    ['tgWebAppVersion', '6.7'],
    ['tgWebAppPlatform', 'tdekstop'],
    ['tgWebAppBotInline', '1'],
    ['tgWebAppData', new URLSearchParams([
      ['query_id', 'AAHdF6IQAAAAAN0XohAOqR8k'],
      ['user', JSON.stringify({
        id: 279058397,
        first_name: 'Vladislav',
        last_name: 'Kibenko',
        username: 'vdkfrost',
        language_code: 'ru',
        is_premium: true,
        allows_write_to_pm: true,
      })],
      ['auth_date', '1691441944'],
      ['hash', 'abc'],
    ]).toString()],
    ['tgWebAppThemeParams', JSON.stringify({
      bg_color: '#17212b',
      button_color: '#5288c1',
      button_text_color: '#ffffff',
      hint_color: '#708499',
      link_color: '#6ab3f3',
      secondary_bg_color: '#232e3c',
      text_color: '#f5f5f5',
    })],
  ]),
);
```

```typescript [Expected result]
const result = {
  botInline: true,
  version: '6.7',
  platform: 'tdesktop',
  themeParams: {
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    textColor: '#f5f5f5',
  },
  initDataRaw: 'query_id=AAHdF6IQAAAAAN0XohAOqR8k&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1691441944&hash=abc',
  initData: {
    queryId: 'AAHdF6IQAAAAAN0XohAOqR8k',
    authDate: new Date(1691441944000),
    hash: 'abc',
    user: {
      id: 279058397,
      firstName: 'Vladislav',
      lastName: 'Kibenko',
      username: 'vdkfrost',
      languageCode: 'ru',
      isPremium: true,
      allowsWriteToPm: true,
    },
  },
};
```

:::

## 序列化

要将启动参数对象表示转换为字符串，开发人员应使用
的 `serializeLaunchParams` 函数：

```typescript
import { serializeLaunchParams } from '@telegram-apps/sdk';

serializeLaunchParams({
  version: '6.7',
  platform: 'tdesktop',
  themeParams: {
    bgColor: '#17212b',
    buttonColor: '#5288c1',
    buttonTextColor: '#ffffff',
    hintColor: '#708499',
    linkColor: '#6ab3f3',
    secondaryBgColor: '#232e3c',
    textColor: '#f5f5f5',
  },
});

// Result:
// tgWebAppVersion=6.7
// &tgWebAppPlatform=tdesktop
// &tgWebAppThemeParams=%7B%22bg_color%22%3A%22%2317212b%22%2C%22button_color%22%3A%22%235288c1%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23708499%22%2C%22link_color%22%3A%22%236ab3f3%22%2C%22secondary_bg_color%22%3A%22%23232e3c%22%2C%22text_color%22%3A%22%23f5f5f5%22%7D
```

## 检索

该软件包可使用
的 `retrieveLaunchParams` 函数从当前环境中提取启动参数。  如果所有已知数据源都包含无效数据，则
会抛出错误。

```typescript
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const launchParams = retrieveLaunchParams();
```
