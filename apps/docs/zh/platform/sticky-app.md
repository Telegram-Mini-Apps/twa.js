# 固定应用(Sticky App)

::: tip

从 小程序**7.7** 版本开始，您可以使用一种特殊方法防止应用程序因向下滑动而关闭
。

- [小程序方法](methods.md#web-app-setup-swipe-behavior)
- [@telegram-apps/sdk 组件](../packages/telegram-apps-sdk/2-x/components/swipe-behavior.md)

:::

开发人员经常想方设法使他们的应用程序具有 "粘性"。 在这种情况下，"粘性 "指的是
，防止应用程序被意外关闭，例如通过向下滑动的手势。

在采取措施防止意外关闭之前，首先必须了解为什么会出现这种
行为。

Telegram 小程序允许开发人员操控关闭按钮的可见性，有时
会将其替换为返回按钮。 因此，Telegram 开发人员希望确保即使关闭按钮不可见，用户仍能
退出应用程序。 这就是 "向下滑动 "机制存在的原因。 因此，Telegram 开发人员希望确保即使关闭按钮不可见，用户仍能
退出应用程序。  这就是 "下滑" 机制存在的原因。

考虑这样一种情况：应用程序显示返回按钮，但却没有响应。 在这种情况下，
，用户无需关闭整个 Telegram 应用程序，只需向下滑动即可关闭迷你
应用程序。 因此，在禁用该机制之前，请确保您的应用程序不会
变得反应迟钝并困住用户。

最后，检查一下 [关闭确认](./closing-behavior.md) 是否满足您的需求。

## 使应用程序具有粘性

要使应用程序具有粘性，可以使用特定的 CSS 样式，防止 WebView 将
刷屏事件传递给 Telegram 应用程序。

以下是您可以使用的 HTML 和 CSS：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
  >
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My Mini App</title>
  <style>
    .mobile-body {
      overflow: hidden;
      height: 100vh;
    }

    .mobile-wrap {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background: red;
    }

    .mobile-content {
      height: calc(100% + 1px);
      background: green;
    }
  </style>
</head>
<body>
  <div id="wrap">
    <div id="content">
      My application goes here.
    </div>
  </div>
  <script src="https://unpkg.com/@telegram-apps/sdk@1.0.0/dist/index.iife.js"></script>
  <script>
    (function() {
      var { retrieveLaunchParams, postEvent } = window.telegramApps.sdk;
      var lp = retrieveLaunchParams();

      // Some versions of Telegram don't need the classes above.
      if (['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(lp.platform)) {
        return;
      }

      // Expand the application.
      postEvent('web_app_expand');

      document.body.classList.add('mobile-body');
      document.getElementById('wrap').classList.add('mobile-wrap');
      document.getElementById('content').classList.add('mobile-content');
    })();
  </script>
</body>
</html>
```

使用这种 HTML 和 CSS 可以防止大多数意外的向下滑动关闭。  虽然这种方法涵盖了
大多数情况，但在极少数情况下可能无效，但在
实际使用中并不常见。

[在 Telegram 中打开](https://t.me/tmajsbot/sticky_app) ( [源代码](https://github.com/Telegram-Mini-Apps/sticky-app/blob/master/dist/index.html))
