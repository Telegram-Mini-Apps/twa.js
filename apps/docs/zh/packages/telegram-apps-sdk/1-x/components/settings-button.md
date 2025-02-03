# `设置按钮`

执行 Telegram 小程序 [设置按钮](../../../../platform/settings-button.md)。

## 初始化

要初始化组件，请使用`initSettingsButton`函数：

```typescript
import { initSettingsButton } from '@telegram-apps/sdk';

const [settingsButton] = initSettingsButton();  
```

## 展示与隐藏

要显示和隐藏 `SettingsButton`，需要使用 `show()` 和 `hide()` 方法。  这些
方法会更新按钮的 `isVisible` 属性：

```typescript
settingsButton.show();
console.log(settingsButton.isVisible); // true  

settingsButton.hide();
console.log(settingsButton.isVisible); // false  
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                 | 监听器                        | 触发条件               |
| ------------------ | -------------------------- | ------------------ |
| `click`            | `() => void`               | 已点击设置按钮            |
| `change`           | `() => void`               | 组件中的某些部分发生了变化      |
| `change:isVisible` | `(value: boolean) => void` | 更改了 `isVisible` 属性 |

## 方法支持 {#methods-support}

方法列表，可用于 [支持检查](#methods-support)：`show` 和 `hide`
