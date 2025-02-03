# `BiometryManager`

## 初始化

要初始化组件，请使用`initBiometryManager`函数：

```typescript
import { initBiometryManager } from '@telegram-apps/sdk';

const [biometryManager] = initBiometryManager();  
```

::: info

由于 `BiometryManager` 无法同步实例化，因此此函数返回一个 Promise，当生物识别管理器数据被检索到时，该 Promise 将被解析。

:::

## 认证

要验证用户身份，请使用 `authenticate` 方法：

```ts
bm
  .authenticate({ reason: 'Authorize to unlock the storage' })
  .then(token => {
    console.log('Token received', token);
  });
```

此方法接受一个可选的 `reason: string` 属性，长度不超过 128 个符号。

## 打开设置

要打开带有生物识别设置的模态窗口，请使用 `openSettings` 方法：

```ts
bm.openSettings();
```

在此模态窗口中，用户可以启用或禁用生物识别功能。

## 申请访问

要申请使用生物识别的权限，请使用 `requestAccess` 方法：

```ts
bm
  .requestAccess({ reason: 'Authorize to start using biometry' })
  .then(accessGranted => {
    console.log('Access granted', accessGranted);
  });
```

除了 `authenticate` 方法外，它还接受一个可选的 `reason: string` 属性，长度为
，最多 128 个符号。

## 更新生物识别令牌 - Biometry Token {#update-biometry-token}

要更新存储在安全存储器中的令牌，请使用 `updateToken` 方法：

```ts
bm
  .updateToken({ token: 'My token' })
  .then(status => {
    console.log('Token updated', status);
  });
```

此方法返回一个包含执行状态的 promise。

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                       | 监听器                             | 触发条件                     |
| ------------------------ | ------------------------------- | ------------------------ |
| `change:accessGranted`   | `(value: boolean) => void`      | 已更改 `accessGranted` 属性   |
| `change:accessRequested` | `(value: boolean) => void`      | 更改了 `accessRequested` 属性 |
| `change:available`       | `(value: boolean) => void`      | 更改了 `available` 属性       |
| `change:deviceId`        | `(value: string) => void`       | 已更改 `deviceId` 属性        |
| `change:tokenSaved`      | `(value: boolean) => void`      | 更改了 `tokenSaved` 属性      |
| `change:token`           | `(value: string) => void`       | 更改了 `token` 属性           |
| `change:biometryType`    | `(value: BiometryType) => void` | 更改了 `biometryType` 属性    |

## 方法支持 {#methods-support}

方法列表，可用于 [支持检查](#methods-support)：`auth`、`openSettings`、`requestAccess` 和 `updateToken`。
