# 返回按钮

💠[组件](../scopes.md) 负责 Telegram Mini
Apps [返回按钮](../../../../platform/back-button.md) 。

## 检查支持

要检查当前 Telegram 小程序版本是否支持返回按钮，请使用
`isSupported` 方法：

::: code-group

```ts [Variable]
import { backButton } from '@telegram-apps/sdk';

backButton.isSupported(); // boolean
```

```ts [Functions]
import { isBackButtonSupported } from '@telegram-apps/sdk';

isBackButtonSupported(); // boolean
```

:::

## 挂载

在使用此组件之前，需要将其挂载，以便与正确配置的属性一起工作。 在使用该组件之前，有必要将其安装到配置正确的
属性中。 为此，请使用 `mount` 方法。 它将更新 `isMounted` 信号属性。 它将更新 `isMounted` 信号属性。

::: code-group

```ts [Variable]
import { backButton } from '@telegram-apps/sdk';

backButton.mount();
backButton.isMounted(); // true
```

```ts [Functions]
import { mountBackButton, isBackButtonMounted } from '@telegram-apps/sdk';

if (mountBackButton.isAvailable()) {
  mountBackButton();
  isBackButtonMounted(); // true
}
```

:::

要卸载，请使用 `unmount` 方法：

::: code-group

```ts [Variable]
backButton.unmount();
backButton.isMounted(); // false
```

```ts [Functions]
import { unmountBackButton, isBackButtonMounted } from '@telegram-apps/sdk';

unmountBackButton();
isBackButtonMounted(); // false
```

:::

## 展示与隐藏

要更改按钮的可见性，请使用 `hide()` 和 `show()` 方法。  这些方法会更新
`isVisible` 信号属性值。

::: code-group

```ts [Variable]
if (backButton.show.isAvailable()) {
  backButton.show();
  backButton.isVisible(); // true
}

if (backButton.hide.isAvailable()) {
  backButton.hide();
  backButton.isVisible(); // false
}
```

```ts [Functions]
import {
  showBackButton,
  hideBackButton,
  isBackButtonVisible,
} from '@telegram-apps/sdk';

if (showBackButton.isAvailable()) {
  showBackButton();
  isBackButtonVisible(); // true
}

if (hideBackButton.isAvailable()) {
  hideBackButton();
  isBackButtonVisible(); // false
}
```

:::

## 跟踪点击

要添加按钮点击监听器，请使用 `onClick` 方法。 它返回一个函数，用于移除绑定的
监听器。 或者，您也可以使用 `offClick` 方法。

::: code-group

```ts [Variable]
if (backButton.onClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = backButton.onClick(listener);
  offClick();
  // or
  backButton.onClick(listener);
  backButton.offClick(listener);
}
```

```ts [Functions]
import { onBackButtonClick, offBackButtonClick } from '@telegram-apps/sdk';

if (onBackButtonClick.isAvailable()) {
  function listener() {
    console.log('Clicked!');
  }

  const offClick = onBackButtonClick(listener);
  offClick();
  // or
  onBackButtonClick(listener);
  offBackButtonClick(listener);
}
```

:::
