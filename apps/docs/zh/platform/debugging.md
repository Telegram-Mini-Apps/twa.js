# 调试 {#Debugging}

应用程序开发是一个相当艰苦和持续的过程，需要大量的时间
和耐心。 为简化操作，Telegram 小程序 平台允许调试已开发的
应用程序。

## 启用调试模式

### Telegram Desktop

- 下载并启动
  Telegram Desktop [Beta 版](https://desktop.telegram.org/changelog#beta-version)。
- 打开侧边菜单，导航至 `Settings > Advanced`。
- 向下滚动打开的菜单，点击 `Experimental settings` 按钮。
- 选中 `Enable webview inspecting` 选项。

启用调试模式后，右键单击 小程序将显示一个上下文菜单，其中包含
`Inspect` 选项，允许您打开开发工具。

### macOS 版 Telegram

- 下载并启动 Telegram macOS [Beta 版](https://telegram.org/dl/macos/beta)。
- 快速点击 5 次 "设置 "图标，打开调试菜单，启用 `Debug小程序`
  选项。

和 Telegram Desktop 中一样，`Inspect Element` 选项也会出现在右键菜单中。

### 安卓版 Telegram

- 在
  设备上[启用 USB 调试](https://developer.chrome.com/docs/devtools/remote-debugging/)。
- 在 Telegram 设置中，一路向下滚动，按住 **版本号** 两次。
- 在调试设置中选择 `Enable WebView Debug`。
- 将手机连接到电脑，然后在 Chrome 浏览器中打开 `chrome://inspect/#devices`--在手机上启动
  你的小程序时，就会看到它。

### iOS 版 Telegram

iOS 网络视图调试需要 Safari 桌面浏览器，因此需要 macOS。

要在没有 macOS 的情况下访问 iOS 调试功能，请参阅 [Eruda](#eruda) 部分。

在 iOS 设备上：

- 转到 `Settings`。
- 找到 Safari 图标并按下。
- 向下滚动并按下 `Advanced`。
- 启用 `Web Inspector` 选项。

在 macOS 上：

- 打开 Safari 浏览器。
- 打开 `Settings` (`⌘ + ,`).
- 选择 `Advanced` 选项卡。
- 选中底部的 `Show features for web developers` 选项。

下一步：

- 通过数据线将 iOS 设备连接到 Mac。
- 在 iOS Telegram 客户端中打开 Mini App。
- 在 macOS 的 Safari 菜单栏中打开 `Develop` 选项卡。
- 选择已连接的 iPhone。
- 可选项：选择 `Connect via network` 并断开电缆。
- 在 `Telegram` 区块下选择已打开的网络视图 URL。

## Eruda

[Eruda](https://www.npmjs.com/package/eruda)是一种在
网络中提供轻量级控制台的技术。  我们通常在不提供自己控制台的环境中使用此类软件包。

首先，需要安装软件包并将其初始化。

::: code-group

```html [script tag]

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init()</script>
```

```typescript [npm package]
import eruda from 'eruda';

eruda.init();
```

:::

初始化 eruda 后，您将在用户界面中看到其元素。  点击它将显示
控制台。
