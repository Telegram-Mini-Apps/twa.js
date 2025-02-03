# 主按钮

![Main Button](/components/main-button.png)

主按钮是一个组件，通常在需要执行某些最终
操作时使用。

该组件的一个用例是发送数据。 例如，一个小型应用程序可能
涉及从目录中选择产品和填充用户的购物车。 当
产品出现在购物车中时，开发人员可以显示主按钮，点击该按钮将导致
订单的创建和处理。

这是一个大小适中但功能有限的简单组件。 开发人员可通过
控制按钮文本、其激活状态、按钮和内部加载器的可见性。 还可以更新文字和背景颜色。

要更新任何主按钮属性，Telegram 小程序提供了
[web_app_setup_main_button](methods.md#web-app-setup-main-button)方法。
当用户点击主按钮时，Telegram 应用程序会发出
[main_button_pressed](events.md#main-button-pressed) 事件。

::: tip

如果点击按钮产生的操作需要一些时间才能完成，建议
在主按钮内显示加载器。 这将使用户了解
应用程序没有被冻结，目前正在执行操作。

:::
