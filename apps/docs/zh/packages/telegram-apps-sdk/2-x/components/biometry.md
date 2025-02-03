# 生物识别

负责 Telegram 小程序生物识别功能的💠[组件](../scopes.md)。

## 检查支持

要检查当前 Telegram 小程序版本是否支持生物识别，请使用 `isSupported`
方法：

::: code-group

```ts [Variable]
import { biometry } from '@telegram-apps/sdk';

biometry.isSupported(); // boolean
```

```ts [Functions]
import { isBiometrySupported } from '@telegram-apps/sdk';

isBiometrySupported(); // boolean
```

:::

## 挂载

在使用此组件之前，需要将其挂载。

这个过程是异步的，因为生物识别数据需要向 Telegram 应用程序申请。
在进程中， `isMounting`信号将被设置为 `true`，并在
完成后更新为 `false`。

如果挂载成功，`isMounted` 信号将设为 `true`。  如果出现错误，`mountError` 信号将反映错误。

::: code-group

```ts [Variable]
if (biometry.mount.isAvailable()) {
  try {
    const promise = biometry.mount();
    biometry.isMounting(); // true
    await promise;
    biometry.isMounting(); // false
    biometry.isMounted(); // true
  } catch (err) {
    biometry.mountError(); // equals "err"
    biometry.isMounting(); // false
    biometry.isMounted(); // false
  }
}
```

```ts [Functions]
import {
  mountBiometry,
  isBiometryMounting,
  isBiometryMounted,
  biometryMountError,
} from '@telegram-apps/sdk';

if (mountBiometry.isAvailable()) {
  try {
    const promise = mountBiometry();
    isBiometryMounting(); // true
    await promise;
    isBiometryMounting(); // false
    isBiometryMounted(); // true
  } catch (err) {
    biometryMountError(); // equals "err"
    isBiometryMounting(); // false
    isBiometryMounted(); // false
  }
}
```

:::

要卸载，请使用 `unmount` 方法：

::: code-group

```ts [Variable]
biometry.unmount();
biometry.isMounted(); // false
```

```ts [Functions]
import { unmountBiometry, isBiometryMounted } from '@telegram-apps/sdk';

unmountBiometry();
isBiometryMounted(); // false
```

:::

## 申请生物识别访问

要请求生物识别访问，请使用 `requestAccess` 方法。  它返回一个带有布尔
值的 promise，表示用户是否允许访问。

::: code-group

```ts [Variable]
if (biometry.requestAccess.isAvailable()) {
  const granted = await biometry.requestAccess(); // boolean
}
```

```ts [Functions]
import { requestBiometryAccess } from '@telegram-apps/sdk';

if (requestBiometryAccess.isAvailable()) {
  const granted = await requestBiometryAccess(); // boolean
}
```

:::

## 认证

要验证用户身份并检索先前保存的令牌，请使用 `authenticate` 方法。

它可选择接受一个具有以下属性的对象：

- `reason?: string`: 要向用户显示的身份验证原因。

该方法返回一个对象，其中包含 `status`（`'failed'` 或 `'authorized'`），如果成功，还会包含 `token: string`。

::: code-group

```ts [Variable]
if (biometry.authenticate.isAvailable()) {
  const { status, token } = await biometry.authenticate({
    reason: 'Please!',
  });

  if (status === 'authorized') {
    console.log(`Authorized. Token: ${token}`);
  } else {
    console.log('Not authorized');
  }
}
```

```ts [Functions]
import { authenticateBiometry } from '@telegram-apps/sdk';

if (authenticateBiometry.isAvailable()) {
  const { status, token } = await authenticateBiometry({
    reason: 'Please!',
  });

  if (status === 'authorized') {
    console.log(`Authorized. Token: ${token}`);
  } else {
    console.log('Not authorized');
  }
}
```

:::

## 更新令牌

要更新本地安全存储中存储的令牌，请使用 `updateToken` 方法。

该方法接受一个带有 `reason` 和 `token` 属性的可选对象。 如果
未提供令牌，则会删除现有令牌。

它会返回一个带有布尔值的 promise，表示是否进行了任何更改。

::: code-group

```ts [Variable]
if (biometry.updateToken.isAvailable()) {
  const updated = await biometry.updateToken({
    reason: 'Want to delete',
  });

  await biometry.updateToken({
    reason: 'Will set a new one',
    token: 'new token',
  });
}
```

```ts [Functions]
import { updateBiometryToken } from '@telegram-apps/sdk';

if (updateBiometryToken.isAvailable()) {
  const updated = await updateBiometryToken({
    reason: 'Want to delete',
  });

  await updateBiometryToken({
    reason: 'Will set a new one',
    token: 'new token',
  });
}
```

:::

## 打开设置

要打开生物识别相关设置模式，请使用 `openSettings` 方法。 该方法只能通过
响应用户交互来触发。

::: code-group

```ts [Variable]
if (biometry.openSettings.isAvailable()) {
  biometry.openSettings();
}
```

```ts [Functions]
import { openBiometrySettings } from '@telegram-apps/sdk';

if (openBiometrySettings.isAvailable()) {
  openBiometrySettings();
}
```

:::
