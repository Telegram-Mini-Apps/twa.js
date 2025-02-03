# 返回按钮

![Back Button](/components/back-button.png)

返回按钮的主要任务是提供一种看似原生的方式，以便在
上回溯路由历史。  但是，Telegram 并不限制开发人员使用返回
按钮的方式，而是允许他们在应用程序中根据需要处理组件点击事件。

在使用该组件时，请务必了解，与其他 Telegram 小程序
组件一样，点击该组件本身并不会触发任何内置操作。
是开发人员的责任。 这是开发人员的责任。

要显示 "返回按钮"，需要调用 [web_app_setup_back_button](methods.md#web-app-setup-back-button) 方法。  当用户点击该组件时，Telegram 应用程序
会发出 [back_button_pressed](events.md#back-button-pressed) 事件。
