# 初始数据

SDK 的这一部分提供了使用 Mini
Apps [init data](../../../platform/init-data.md) 的实用程序。

## 解析

该库包含函数 `parseInitData`，可从查询参数中提取初始化数据
信息。  下面是一个使用示例：

```typescript
import { parseInitData } from '@telegram-apps/sdk';

// Let's imagine, we have init data in a raw format like this. Telegram application is
// sending it in the exact same format.
const initDataString =
  'query_id=AAHdF6IQAAAAAN0XohDhrOrc' +
  '&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D' +
  '&auth_date=1662771648' +
  '&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2';

// Extract init data.
console.log(parseInitData(initDataString));
// or
console.log(parseInitData(new URLSearchParams(initDataString)));

// Output:
// {
//   authDate: 2022-09-10T01:00:48.000Z,
//   hash: 'c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2',
//   queryId: 'AAHdF6IQAAAAAN0XohDhrOrc',
//   user: {
//     id: 279058397,
//     firstName: 'Vladislav',
//     lastName: 'Kibenko',
//     username: 'vdkfrost',
//     languageCode: 'ru',
//     isPremium: true
//   }
// }
```

该函数提取所需的参数，并自动验证其类型。 如果
中的属性类型或值无效，则会出错。 要了解返回类型的更多信息，请参阅
的 [InitData](init-data/init-data.md) 类型页面。

## 验证和签名

验证和签名实用程序已移至独立的
软件包 - [@telegram-apps/init-data-node](../../telegram-apps-init-data-node) 中。
