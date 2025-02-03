# 方法与事件

本节 SDK 涵盖与
[apps communication](../../../platform/apps-communication.md) 相关的主题。

## 调用方法

要调用 Telegram 小程序的方法，开发人员应使用 `postEvent` 函数：

```typescript
import { postEvent } from '@telegram-apps/sdk';

postEvent('web_app_setup_back_button', { is_visible: true });
```

该功能会根据当前
环境功能自动找到发送该事件的正确方法。  为了更高的准确性，它会确定当前的 Telegram 应用类型，并选择相应的流程。

### `request`

如果需要调用某些 Telegram 小程序方法
并接收指定事件，则应使用 `request` 函数。 如果需要调用某些 Telegram 小程序方法
并接收指定事件，则应使用 `request` 函数。 例如，开发人员希望
调用 [web_app_request_viewport](../../../platform/methods.md#web-app-request-viewport)
方法并捕获 [viewport_changed](../../../platform/events.md#viewport-changed)
事件，以接收实际的视口数据。

```typescript
import { request } from '@telegram-apps/sdk';

const viewport = await request({
  method: 'web_app_request_viewport',
  event: 'viewport_changed'
});

console.log(viewport);
// Output:
// {
//   is_state_stable: true,
//   is_expanded: false,
//   height: 320
// };
```

如果 Telegram 小程序方法接受参数，则应在第三个参数的 `params`
属性中传递这些参数：

```typescript
import { request } from '@telegram-apps/sdk';

const buttonId = await request({
  method: 'web_app_open_popup',
  event: 'popup_closed',
  params: {
    title: 'Caution',
    message: 'Should we delete you account?',
    buttons: [
      { id: 'yes', type: 'ok' },
      { id: 'no', type: 'cancel' },
    ],
  },
});
```

此外，您还可以同时跟踪多个事件：

```typescript
import { request } from '@telegram-apps/sdk';

const result = await request({
  method: 'web_app_open_scan_qr_popup',
  event: ['qr_text_received', 'scan_qr_popup_closed'],
});

// result will either be qr_text_received or 
// scan_qr_popup_closed events payload.
```

该函数允许传递其他选项，如 `postEvent`、`timeout` 和 `capture`。

#### `postEvent`

我们使用 `postEvent` 选项重写方法，该方法用于调用 Telegram 小程序
方法。

```typescript
import { request, createPostEvent } from '@telegram-apps/sdk';

request({
  method: 'web_app_request_viewport',
  event: 'viewport_changed',
  postEvent: createPostEvent('6.5'),
});
```

#### `timeout`

`timeout` 选项负责分配请求超时。  如果超时，
，则会出现错误。

```typescript
import { request, isTimeoutError } from '@telegram-apps/sdk';

try {
  await request({
    method: 'web_app_invoke_custom_method',
    event: 'custom_method_invoked',
    timeout: 5000,
    params: {
      req_id: '1',
      method: 'deleteStorageValues',
      params: { keys: ['a'] },
    },
  });
} catch (e) {
  console.error(isTimeoutError(e) ? 'Timeout error' : 'Some different error', e);
}
```

#### `capture`

`capture` 属性是一个函数，允许开发人员确定是否应捕获小程序
事件并从 `request` 函数中返回：

```typescript
const slug = 'jjKSJnm1k23lodd';

request({
  method: 'web_app_open_invoice',
  event: 'invoice_closed',
  params: { slug },
  capture(data) {
    return slug === data.slug;
  },
});
```

默认情况下，`request` 函数会捕获带有所需名称的第一个事件。  在
的情况下，"request "函数只有在事件具有预期的标签时才会捕获事件。

## 调用自定义方法

自定义方法是 Telegram 小程序
[web_app_invoke_custom_method](../../../platform/methods.md#web-app-invoke-custom-method)
方法可以使用的方法。  调试

以下是不使用该函数的代码示例：

```typescript
import { request } from '@telegram-apps/sdk';

const reqId = 'ABC';

request({
  method: 'web_app_invoke_custom_method',
  event: 'custom_method_invoked',
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

这样，我们就可以使用 `invokeCustomMethod` 函数重写它了：

```typescript
import { invokeCustomMethod } from '@telegram-apps/sdk';

invokeCustomMethod('deleteStorageValues', { keys: ['a'] }, 'ABC');
```

与`request`函数相反，`invokeCustomMethod`函数解析结果，并
检查是否包含`error`属性。  如果出现这种情况，函数将抛出相应的
错误。 否则，将返回 `result` 属性。

## 事件监听

### `on` 和 `off`

要开始处理事件，开发人员可以使用 `on` 和 `off` 函数。  下面是
`on` 函数的基本用法：

```typescript
import { on } from '@telegram-apps/sdk';

// Start listening to "viewport_changed" event. Returned value
// is a function, which removes this event listener.
const removeListener = on('viewport_changed', payload => {
  console.log('Viewport changed:', payload);
});

// Remove this event listener.
removeListener();
```

要停止监听事件，开发人员也可以使用 `off` 函数：

```typescript
import { on, off, type MiniAppsEventListener } from '@telegram-apps/sdk';

const listener: MiniAppsEventListener<'viewport_changed'> = payload => {
  console.log('Viewport changed:', payload);
};

// Start listening to event.
on('viewport_changed', listener);

// Remove event listener.
off('viewport_changed', listener);
```

要只调用监听器一次，请使用第三个布尔参数。

```typescript
import { on } from '@telegram-apps/sdk';

// Will be automatically removed after the first listener execution.
on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
}, true);
```

### `subscribe` 和 `unsubscribe`

要监听从本地 Telegram 应用程序发送的所有事件，开发人员应使用
`subscribe` 和 `unsubscribe`：

```typescript
import {
  subscribe,
  unsubscribe,
  type MiniAppsGlobalEventListener,
} from '@telegram-apps/sdk';

const listener: MiniAppsSubscribeListener = (event) => {
  console.log('Received event', event);
};

// Listen to all events.
subscribe(listener);

// Remove this listener.
unsubscribe(listener);
```

监听器接受一个包含 `name` 和 `payload` 属性的对象，这些属性是小程序
事件名称和有效载荷。

## 检查方法支持

`postEvent` 函数本身未检查当前本地 Telegram
应用程序是否支持指定方法。  为此，开发人员可以使用 `supports` 函数，该函数接受小程序
方法名称和当前平台版本：

```typescript
import { supports } from '@telegram-apps/sdk';

supports('web_app_trigger_haptic_feedback', '6.0'); // false
supports('web_app_trigger_haptic_feedback', '6.1'); // true
```

`supports` 函数还允许检查方法参数中的指定参数是否受
支持：

```typescript
import { supports } from '@telegram-apps/sdk';

supports('web_app_open_link', 'try_instant_view', '6.0'); // false
supports('web_app_open_link', 'try_instant_view', '6.7'); // true
```

::: tip

建议在调用 小程序方法之前使用该函数，以防止应用程序出现
停顿和其他意外行为。

:::

### 创建更安全的 `postEvent`

该软件包包含一个名为 `createPostEvent` 的函数，它将当前小程序
版本作为输入。 它返回 `postEvent` 函数，内部检查是否支持指定的
方法和参数。 如果不是，函数将出错。 它返回 `postEvent` 函数，内部检查是否支持指定的
方法和参数。 如果不是，函数将出错。

```typescript
import { createPostEvent } from '@telegram-apps/sdk';

const postEvent = createPostEvent('6.5');

// Will work fine.
postEvent('web_app_read_text_from_clipboard');

// Will throw an error.
postEvent('web_app_request_phone');
```

强烈建议使用此 `postEvent` 生成器，以确保方法调用按照
的预期运行。

## 调试

软件包支持启用调试模式，从而记录与事件
处理相关的信息。 要更改调试模式，请使用`setDebug`函数： 要更改调试模式，请使用`setDebug`函数：

```typescript
import { setDebug } from '@telegram-apps/sdk';

setDebug(true);
```

## 目标源

如果软件包在浏览器环境（iframe）中使用，则软件包会使用
函数 `window.parent.postMessage` 。 此功能需要指定目标来源，以确保
事件只发送到受信任的父 iframe。 默认情况下，软件包
使用 `https://web.telegram.org` 作为原点。
开发人员应使用 `setTargetOrigin` 函数将事件传输到其他来源： 此功能需要指定目标来源，以确保
事件只发送到受信任的父 iframe。 默认情况下，该软件包使用`https://web.telegram.org`作为来源。 开发人员应使用 `setTargetOrigin` 函数将事件传输到其他来源：

```typescript
import { setTargetOrigin } from '@telegram-apps/sdk';

setTargetOrigin('https://myendpoint.org');
```

::: warning

强烈建议不要长期覆盖此值，否则可能导致安全问题。
只有当您知道自己在做什么时，才能指定该值。
只有当您知道自己在做什么时，才能指定该值。

:::
