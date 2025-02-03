# 设置按钮

![Popup](/components/settings-button.png)

设置按钮是 小程序界面右上角菜单中显示的组件。 设置按钮是 小程序界面右上角菜单中显示的组件。 与
其他许多 Telegram 小程序组件一样，该按钮没有内置操作，如何处理点击该按钮的操作由
开发人员决定。

在 Telegram 小程序`6.10`版本之前，只有属于
Telegram Ads 的主要广告商机器人的小程序才会显示此按钮。
从版本 `6.10` 开始，所有开发人员都可以选择
，使用 [web_app_setup_settings_button](methods.md#web-app-setup-settings-button)
方法显示该按钮。

当用户点击设置按钮时，Telegram 应用程序会发出
[settings_button_pressed](events.md#settings-button-pressed) 事件。
