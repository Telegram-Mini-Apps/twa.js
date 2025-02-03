# 主题参数

本节 SDK 涵盖与
[主题参数](../../../platform/theming.md) 相关的主题。

## 解析

要解析作为主题参数的值，软件包提供了 `parseThemeParams` 方法。 该
方法接受一个 JSON 字符串对象或 JavaScript 对象，返回 `ThemeParams`
接口。 如果提供的数据无效，则会出错。 该
方法接受一个 JSON 字符串对象或 JavaScript 对象，返回 `ThemeParams`
接口。 如果提供的数据无效，则会出错。

::: code-group

```typescript [Usage example]
import { parseThemeParams } from '@telegram-apps/sdk';

parseThemeParams({
  accent_text_color: "#6ab2f2",
  bg_color: "#17212b",
  button_color: "#5288c1",
  button_text_color: "#ffffff",
  destructive_text_color: "#ec3942",
  header_bg_color: "#17212b",
  hint_color: "#708499",
  link_color: "#6ab3f3",
  secondary_bg_color: "#232e3c",
  section_bg_color: "#17212b",
  section_header_text_color: "#6ab3f3",
  subtitle_text_color: "#708499",
  text_color: "#f5f5f5"
});
```

```typescript [Expected result]
const result = {
  accentTextColor: "#6ab2f2",
  bgColor: "#17212b",
  buttonColor: "#5288c1",
  buttonTextColor: "#ffffff",
  destructiveTextColor: "#ec3942",
  headerBgColor: "#17212b",
  hintColor: "#708499",
  linkColor: "#6ab3f3",
  secondaryBgColor: "#232e3c",
  sectionBgColor: "#17212b",
  sectionHeaderTextColor: "#6ab3f3",
  subtitleTextColor: "#708499",
  textColor: "#f5f5f5"
};
```

:::

假设每个属性都使用蛇形大小写，它会将其转换为驼峰形大小写。

## 序列化

要将主题参数对象表示转换为字符串，开发人员应使用
的 `serializeThemeParams` 函数：

```typescript
import { serializeThemeParams } from '@telegram-apps/sdk';

serializeThemeParams({
  accentTextColor: "#6ab2f2",
  bgColor: "#17212b",
  buttonColor: "#5288c1",
  buttonTextColor: "#ffffff",
  destructiveTextColor: "#ec3942",
  headerBgColor: "#17212b",
  hintColor: "#708499",
  linkColor: "#6ab3f3",
  secondaryBgColor: "#232e3c",
  sectionBgColor: "#17212b",
  sectionHeaderTextColor: "#6ab3f3",
  subtitleTextColor: "#708499",
  textColor: "#f5f5f5"
});

// Result:
// `{
//   "accent_text_color":"#6ab2f2",
//   "bg_color":"#17212b",
//   "button_color":"#5288c1",
//   "button_text_color":"#ffffff",
//   "destructive_text_color":"#ec3942",
//   "header_bg_color":"#17212b",
//   "hint_color":"#708499",
//   "link_color":"#6ab3f3",
//   "secondary_bg_color":"#232e3c",
//   "section_bg_color":"#17212b",
//   "section_header_text_color":"#6ab3f3",
//   "subtitle_text_color":"#708499",
//   "text_color":"#f5f5f5"
// }`
```
