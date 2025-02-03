# 全局

所谓全局值，是指在软件包的所有方法中使用的全局值。

## `$debug`

`$debug` 信号负责启用或禁用额外的调试日志。

```typescript
import { $debug } from '@telegram-apps/bridge';

$debug.set(true);
```

将其设置为 `true`后，在调用 `postEvent` 函数或接收
小程序事件时就会看到日志。

## `$targetOrigin`

如果软件包在浏览器环境（iframe）中使用，它将使用 `window.parent.postMessage`
函数。  该功能需要指定目标来源，以确保事件只发送到
受信任的父 iframe。 默认情况下，该软件包使用`https://web.telegram.org`作为来源。

```typescript
import { $targetOrigin } from '@telegram-apps/bridge';

$targetOrigin.set('https://i-know-what-i-am.doing');
```

> [!WARNING]
> 强烈建议不要覆盖此值，否则可能导致安全问题。
> 只有在确定其影响时才指定该值。
