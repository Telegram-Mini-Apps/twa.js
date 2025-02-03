# 事件

本文涵盖与[应用程序通信](../../platform/apps-communication.md)事件相关的主题。

## 定义事件处理程序

为避免副作用，该软件包在导入时不会调用任何函数。 Telegram 小程序
需要在本地 Telegram 应用程序和小程序之间使用特定的通信方式，
，其中涉及在全局 `window` 对象中定义某些方法。

要启用此功能并开始接收 Telegram 小程序事件，请使用 `defineEventHandlers`
函数：

```typescript
import { defineEventHandlers } from '@telegram-apps/bridge';

defineEventHandlers();
```

此设置确保小程序通过监听和处理必要的事件，能够正确与本地的Telegram应用交互。

## `on` 和 `off`

要开始处理事件，需要使用 `on` 和 `off` 函数。

下面是 `on` 函数的一个基本示例：

```typescript
import { on } from '@telegram-apps/bridge';

// Start listening to the "viewport_changed" event. The returned value
// is a function that removes this event listener.
const removeListener = on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
});

// Remove this event listener.
removeListener();
```

另外，要停止监听事件，开发人员可以使用 `off` 功能：

```typescript
import { on, off, type EventListener } from '@telegram-apps/bridge';

const listener: EventListener<'viewport_changed'> = (payload) => {
  console.log('Viewport changed:', payload);
};

// Start listening to the event.
on('viewport_changed', listener);

// Remove the event listener.
off('viewport_changed', listener);
```

要只调用监听器一次，则使用第三个布尔参数：

```typescript
import { on } from '@telegram-apps/bridge';

// Will automatically be removed after the first listener execution.
on('viewport_changed', (payload) => {
  console.log('Viewport changed:', payload);
}, true);
```

## `subscribe` 和 `unsubscribe`

要监听本地 Telegram 应用程序发送的所有事件，需要使用 `subscribe`
和 `unsubscribe` 功能：

```typescript
import {
  subscribe,
  unsubscribe,
  type SubscribeListener,
} from '@telegram-apps/bridge';

const listener: SubscribeListener = (event) => {
  console.log('Received event', event);
};

// Listen to all events.
subscribe(listener);

// Remove the listener.
unsubscribe(listener);
```
