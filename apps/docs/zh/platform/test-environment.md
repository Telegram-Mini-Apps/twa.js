# 测试环境

Telegram 为开发提供了特殊环境，并具有一些特定功能。 例如，
，开发者就可以创建一个新的 Telegram 机器人，并通过 HTTP
协议或甚至 IP 指定一个小程序链接。 与测试环境不同，在生产环境中，开发人员只允许
指定使用 HTTPS 协议的链接。 因此，在小程序
开发过程中，这一步骤非常重要。

::: info

您只能在 Telegram 移动版本的测试环境中创建新账户。
不过，在本文档中，您将了解如何在其他
版本的 Telegram 中链接到这些账户。
不过，在本文档中，您将了解如何在其他
版本的 Telegram 中链接到这些账户。

:::

### iOS 版 Telegram

- 快速点击 `Settings` 部分 10 次。
- 点击 `Accounts` 按钮。
- 点击 `Login to another account`。
- 点击 `Test` 按钮。
- 创建新账户。

### Telegram Desktop

- 打开侧边菜单。
- 展开指定当前用户名的菜单项。
- 按住 `Shift` + `Alt`，在 `Add Account` 按钮上按 **鼠标右键**。
- 选择 `Test Server`。
- 链接在测试环境中创建的账户。

### 适用于 macOS 的 Telegram

- 快速点击 设置 图标 10 次，打开调试菜单。
- 按住 `cmd`，点击 `Add Account` 按钮。
- 链接在测试环境中创建的账户。
