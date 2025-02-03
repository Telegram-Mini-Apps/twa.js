# 关闭行为

![Closing confirmation](/functionality/closing-confirmation.png)

小程序旨在处理不同的、有时甚至是复杂的场景，用户可以
深入浏览应用程序架构。  当用户按照
特定的工作流程进行操作时，这种情况很常见，例如购买机票，其中涉及多个步骤。

意外关闭小程序并丢失数据会让用户非常失望。  为了防止这样的事情发生
，开发人员可以选择配置关闭行为，并在关闭应用程序前提示用户
。

要启用关闭确认，Telegram 小程序提供了一个名为 [web_app_setup_closing_behavior](methods.md#web-app-setup-closing-behavior) 的方法。
