# 初始化

正如
`@telegram-apps/bridge` [文档](../../telegram-apps-bridge/events.md#define-event-handlers) 中所述，必须手动定义
事件处理程序，才能开始监听 Telegram 小程序事件。

此外，在我们的代码中，我们希望确保在调用某个方法时，该方法要么有效，要么我们
会收到该方法无效的通知。 为此，有必要了解当前使用的 Telegram
小程序版本。

为满足这些要求，软件包提供了 `init` 函数，该函数接受具有以下结构的对象
：

```ts
interface Options {
  /**
   * True if the SDK should accept styles sent from the Telegram
   * application.
   * @default true
   */
  acceptCustomStyles?: boolean;
  /**
   * The maximum supported Mini Apps version.
   * @default Extracted using the `retrieveLaunchParams`
   * function.
   * @see retrieveLaunchParams
   */
  version?: Version;
  /**
   * Custom postEvent function.
   *
   * Passing the "strict" value creates a function that always
   * checks if the specified call is supported by the current Mini
   * Apps version. If the method is unsupported, an error
   * will be thrown.
   *
   * Passing the "non-strict" value creates a postEvent function
   * that doesn't throw errors but warns about missing method
   * support.
   *
   * @default 'strict'
   * @see createPostEvent
   */
  postEvent?: PostEventFn | 'strict' | 'non-strict';
}
```

在大多数情况下，开发人员不需要使用这些选项。

调用该函数后，将配置软件包的全局依赖关系，并创建 Telegram
小程序事件处理程序。

```ts
import { init } from '@telegram-apps/sdk';

init();
```
