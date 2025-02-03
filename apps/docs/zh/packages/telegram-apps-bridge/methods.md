# 方法

本文涵盖与[应用程序通信](../../platform/apps-communication.md) 方法相关的主题。

## 调用方法

要调用 Telegram 小程序的方法，开发人员应使用 `postEvent` 函数：

```typescript
import { postEvent } from '@telegram-apps/bridge';

postEvent('web_app_setup_back_button', { is_visible: true });
```

该功能会根据当前
环境自动确定发送事件的正确方式。  它能识别 Telegram 应用程序类型并选择合适的流程。

### `request`

当开发人员需要调用 Telegram 小程序方法和
接收特定事件时，应使用 `request` 函数。

例如，调用
[web_app_request_viewport](../../platform/methods.md#webapp-request-viewport) 方法并捕捉
[viewport_changed](../../platform/events.md#viewport-changed) 事件以获取实际视口数据：

```typescript
import { request } from '@telegram-apps/bridge';

const viewport = await request(
  'web_app_request_viewport',
  'viewport_changed',
);

console.log(viewport);
// Output:
// {
//   is_state_stable: true,
//   is_expanded: false,
//   height: 320
// };
```

如果 Telegram 小程序方法接受参数，则应在第三个参数的 `params` 属性
中传递这些参数：

```typescript
const buttonId = await request('web_app_open_popup', 'popup_closed', {
  params: {
    title: 'Caution',
    message: 'Should we delete your account?',
    buttons: [
      { id: 'yes', type: 'ok' },
      { id: 'no', type: 'cancel' },
    ],
  },
});
```

它还可以同时跟踪多个事件：

```typescript
const result = await request(
  'web_app_open_scan_qr_popup',
  ['qr_text_received', 'scan_qr_popup_closed'],
);

// The result will either be the qr_text_received 
// or scan_qr_popup_closed event payload.
```

该函数允许传递其他选项，如 `postEvent`、`abortSignal`、`timeout`、
和 `capture`。

#### `postEvent`

`postEvent` 选项允许开发人员覆盖用于调用 Telegram 小程序
方法的方法。

```typescript
request('web_app_request_viewport', 'viewport_changed', {
  postEvent() {
    console.log('Hey, I am not going to do anything');
  },
});
```

#### `abortSignal`

要从外部中止返回的 promise，请使用 `abortSignal` 选项。

```ts
const controller = new AbortController();

request('web_app_request_viewport', 'viewport_changed', {
  abortSignal: controller.signal,
});

setTimeout(() => {
  controller.abort(new Error('Not going to wait anymore'));
}, 500);
```

#### `timeout`

`timeout` 选项为请求指定一个超时时间。

```typescript
import { request } from '@telegram-apps/bridge';

try {
  await request(
    'web_app_invoke_custom_method',
    'custom_method_invoked',
    {
      timeout: 5000,
      params: {
        req_id: '1',
        method: 'deleteStorageValues',
        params: { keys: ['a'] },
      },
    },
  );
} catch (e) {
  console.error(e); // TypedError with e.type === 'ERR_TIMED_OUT'
}
```

#### `capture`

`capture` 属性是一个允许开发人员确定是否应捕获小程序
事件并从 `request` 函数返回的函数：

```typescript
const slug = 'jjKSJnm1k23lodd';

request('web_app_open_invoice', 'invoice_closed', {
  params: { slug },
  capture(data) {
    return slug === data.slug;
  },
});
```

默认情况下，`request` 函数会捕获带有所需名称的第一个事件。 在这种情况下，只有当事件具有预期的标签时，该函数才会捕获事件，特定于
[invoice_closed](../../platform/events.md#invoice-closed) 事件。

当传递一个事件数组时，`capture` 函数将收到一个对象，其中包含
`event: EventName` 和 `payload?: EventPayload` 属性的对象。

## 调用自定义方法

自定义方法是指可与
[web_app_invoke_custom_method](../../platform/methods.md#web-app-invoke-custom-method) 小程序
方法一起使用的方法。

`invokeCustomMethod` 函数通过重复使用 `request` 函数，简化了此类方法的使用。

下面是一个不使用该函数的示例：

```typescript
const reqId = 'ABC';

request('web_app_invoke_custom_method', 'custom_method_invoked', {
  params: {
    req_id: reqId,
    method: 'deleteStorageValues',
    params: { keys: ['a'] },
  },
  capture(data) {
    return data.req_id === reqId;
  }
});
```

现在，使用 `invokeCustomMethod` 函数重新编写：

```typescript
import { invokeCustomMethod } from '@telegram-apps/bridge';

invokeCustomMethod('deleteStorageValues', { keys: ['a'] }, 'ABC');
```

在内部，它只是封装了与方法相关的特定逻辑，因此开发人员不应这样做。

与`request`函数不同，`invokeCustomMethod`函数会解析结果，并检查
是否包含`error`属性。  如果是，函数会抛出相应的错误；否则，
，返回 `result` 属性。

## 检查方法支持

`postEvent` 函数不会检查当前 Telegram 应用程序是否支持指定的方法。  为此，需要使用 `supports` 函数。

它接受 小程序方法名称和当前平台版本：

```typescript
import { supports } from '@telegram-apps/bridge';

supports('web_app_trigger_haptic_feedback', '6.0'); // false
supports('web_app_trigger_haptic_feedback', '6.1'); // true
```

`supports` 函数还可以检查方法参数中的特定参数是否受
支持：

```typescript
import { supports } from '@telegram-apps/bridge';

supports('web_app_open_link', 'try_instant_view', '6.0'); // false
supports('web_app_open_link', 'try_instant_view', '6.7'); // true
```

> [!TIP]
> 建议在调用 小程序方法之前使用该函数，以防止应用程序
> 陷入僵局或遇到意外行为。

## 创建更安全的 `postEvent`

该软件包包含一个名为 `createPostEvent` 的函数，它将当前 小程序版本作为
输入。

它返回 `postEvent` 函数，该函数内部检查传递的方法和
参数是否受支持。

```typescript
import { createPostEvent } from '@telegram-apps/bridge';

const postEvent = createPostEvent('6.5');

// Will work fine.
postEvent('web_app_read_text_from_clipboard');

// Will throw an error, this method is not supported 
// in Mini Apps version 6.5.
postEvent('web_app_request_phone');
```

作为第二个可选参数，函数接受一个回调，如果方法或
参数不支持，则调用该回调。

```ts
createPostEvent('6.0', (data) => {
  if ('param' in data) {
    console.warn(
      'Oops, the parameter', data.param,
      'in method', data.method,
      'is not supported',
    );
  } else {
    console.warn('Oops, method', data.method, 'is not supported');
  }
});
```

若要记录警告而不是抛出错误，可以传递 `'non-strict'` 值：

```ts
createPostEvent('6.0', 'non-strict');
```
