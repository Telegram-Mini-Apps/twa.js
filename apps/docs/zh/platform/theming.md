# 主题设置

![Theming](/functionality/theming.png)

小程序是一种网络应用程序，旨在拥有原生外观。  这不仅包括使用模仿本地元素的组件
，还包括采用父应用程序的颜色
方案。

小程序的颜色目前与 Telegram 应用程序中使用的颜色一致。
小程序应使用这些颜色，以确保外观的一致性和原生性。
检索

## 检索

### 应用启动参数

Telegram 小程序通过名为
[tgWebAppThemeParams](launch-parameters.md#tgwebappthemeparams) 的应用启动参数提供主题数据。  该
参数表示一个序列化 JSON 对象，其中包含一系列可选属性，每个
属性描述一种调色板颜色。

下面是一个完整的参数值示例：

```json
{
  "accent_text_color": "#6ab2f2",
  "bg_color": "#17212b",
  "button_color": "#5288c1",
  "button_text_color": "#ffffff",
  "bottom_bar_bg_color": "#ffffff",
  "destructive_text_color": "#ec3942",
  "header_bg_color": "#17212b",
  "hint_color": "#708499",
  "link_color": "#6ab3f3",
  "secondary_bg_color": "#232e3c",
  "section_bg_color": "#17212b",
  "section_header_text_color": "#6ab3f3",
  "subtitle_text_color": "#708499",
  "text_color": "#f5f5f5"
}
```

### Telegram 小程序方法

不过，通过应用启动参数检索主题数据并不是唯一的方法。  Telegram 小程序
还允许通过名为 [web_app_request_theme](methods.md#web-app-request-theme) 的方法
获取主题。

调用此方法后，Telegram 将发出名为 [theme_changed](events.md#theme-changed) 的事件
。  该事件
的有效载荷包含一个名为 `theme_params` 的属性，其格式如上一节所述。

## 背景和标题颜色

只要小程序始终显示在原生组件（由
_header_ 和 _body_ 等部分组成）中，Telegram 小程序也允许更改其颜色。

要更改标题颜色，开发人员应使用
[web_app_set_header_color](methods.md#web-app-set-header-color) 方法，该方法提供了一种通过使用主题键或自定义 RGB 字符串来设置颜色的方法。

要更新主体颜色，需要使用
[web_app_set_background_color](methods.md#web-app-set-background-color)
方法。
