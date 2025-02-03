# `返回按钮`

执行 Telegram 小程序 [返回按钮](.../.../.../.../platform/back-button.md)。

## 初始化

要初始化组件，请使用 `initBackButton` 函数：

```typescript
import { initBackButton } from '@telegram-apps/sdk';

const [backButton] = initBackButton();  
```

## 展示与隐藏

显示和隐藏 `BackButton` 时，需要使用 `show()` 和 `hide()` 方法。
更新按钮的 `isVisible` 属性： 这些方法
更新按钮的 `isVisible` 属性：

```typescript
backButton.show();
console.log(backButton.isVisible); // true  

backButton.hide();
console.log(backButton.isVisible); // false  
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                 | 监听器                        | 触发条件               |
| ------------------ | -------------------------- | ------------------ |
| `click`            | `() => void`               | 点击了返回按钮            |
| `change`           | `() => void`               | 组件中的某些部分发生了变化      |
| `change:isVisible` | `(value: boolean) => void` | 更改了 `isVisible` 属性 |

## 方法支持 {#methods-support}

方法列表，可用于 [支持检查](#methods-support)：`show` 和 `hide`
