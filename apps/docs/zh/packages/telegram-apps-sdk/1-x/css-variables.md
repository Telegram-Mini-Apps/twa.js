# CSS 变量

该软件包提供的实用程序可帮助开发人员自动管理组件 CSS 变量。
与 Telegram SDK 类似，`@telegram-apps/sdk` 允许开发人员设置全局 CSS 变量，将
连接到特定组件。
与 Telegram SDK 类似，"@telegram-apps/sdk "允许开发人员设置全局 CSS 变量，将
关联到特定组件。

## `bindViewportCSSVars`

`bindViewportCSSVars` 函数接受一个 [Viewport](components/viewport.md) 实例，并为以下属性创建
变量：`height`、`width` 和 `stableHeight`。

```ts
import { bindViewportCSSVars, initViewport } from '@telegram-apps/sdk';

const vp = await initViewport();

bindViewportCSSVars(vp);
```

默认情况下，该函数会创建名为
的全局 CSS 变量：`-tg-viewport-height`、`-tg-viewport-width` 和 `-tg-viewport-stable-height`。  不过，
函数允许传递一个 CSS 变量名生成器，该生成器接受其中一个字符串值，每个
负责一个特定属性：`width`, `height`, 或 `stable-height`。

```ts
bindViewportCSSVars(vp, key => {
  switch (key) {
    case 'height':
      return `--viewportHeight`;
    case 'width':
      return `--viewportWidth`;
    case 'stable-height':
      return `--viewportStableHeight`;
    default:
      return `--void`;
  }
});
```

## `bindThemeParamsCSSVars`

该函数接受 [ThemeParams](components/theme-params.md) 实例，并创建与主题参数相关的全局 CSS
变量。

```ts
import { bindThemeParamsCSSVars, initThemeParams } from '@telegram-apps/sdk';

const tp = initThemeParams();

bindThemeParamsCSSVars(tp);
```

默认情况下，该函数会将 ThemeParams 实例属性的驼峰字母大小写转换为短横线命名法大小写，并在
中添加前缀 `--tg-theme-`。  下面是创建变量的示例：

- `--tg-theme-bg-color`
- `--tg-theme-secondary-bg-color`
- `--tg-theme-accent-text-color`
- 等等

与 [bindViewportCSSVars](#bindViewportCSSVars) 函数类似，它允许传递一个接受 ThemeParams 实例属性的 CSS
变量名生成器。

```ts
bindThemeParamsCSSVars(tp, key => {
  // Converts camel case to kebab case.
  return `--${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
});
```

## `bindMiniAppCSSVars`

`bindMiniAppCSSVars` 函数接受一个 [MiniApp](components/mini-app.md) 实例和
以及一个 [ThemeParams](components/theme-params.md) 实例，创建与
MiniApp 实例相关的全局 CSS 变量。

```ts
import { bindMiniAppCSSVars, initMiniApp, initThemeParams } from '@telegram-apps/sdk';

const ma = initMiniApp();
const tp = initThemeParams();

bindMiniAppCSSVars(ma, tp);
```

默认情况下，它会创建 `--tg-bg-color` 和 `--tg-header-color` 等变量。 不过，与所有
其他 CSS 变量绑定函数一样，它允许自定义生成的名称。 传递的生成器
接受其中一个关键字：`bg` 和 `header`，希望它能返回一个完整的 CSS 变量名。 不过，与所有
其他 CSS 变量绑定函数一样，它允许自定义生成的名称。 传递的生成器
接受其中一个关键字：`bg` 和 `header`，希望它能返回一个完整的 CSS 变量名。

```ts
bindMiniAppCSSVars(ma, tp, key => {
  switch (key) {
    case 'bg':
      return `--miniAppBg`;
    case 'header':
      return `--miniAppHeader`;
    default:
      return `--void`;
  }
});
```
