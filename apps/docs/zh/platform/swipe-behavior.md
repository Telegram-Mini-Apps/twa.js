# 滑动行为

![Swipe behavior](/functionality/swipe-behavior.png)

小程序有时使用的轻扫手势可能与最小化和关闭应用程序的手势冲突。
对于用户来说，这可能会表现为在与小程序互动时不小心向下滑动以停靠该应用。
对于用户来说，这可能会表现为在与小程序互动时不小心向下滑动以停靠该应用。

为了避免这种情况，开发人员可以选择配置轻扫行为，这样在轻扫应用程序本身时，应用程序就不会隐藏在 dock 中。

无论如何，用户仍然可以通过轻扫小程序的标题来最小化和关闭小程序。

要禁用垂直页面轻扫，Telegram 小程序提供了一个名为 [web_app_setup_swipe_behavior](methods.md#web-app-setup-swipe-behavior) 的方法。
