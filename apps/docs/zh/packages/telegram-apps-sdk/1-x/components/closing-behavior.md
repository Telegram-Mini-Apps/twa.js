# `关闭行为`

执行 Telegram Mini
Apps [关闭行为](../../../../platform/closing-behavior.md) 功能。

## 初始化

要初始化组件，请使用 `initClosingBehavior` 函数：

```typescript
import { initClosingBehavior } from '@telegram-apps/sdk';

const [closingBehavior] = initClosingBehavior()；  
```

## 关闭确认

关闭行为 要启用或禁用关闭确认，需要使用 `enableConfirmation()`
和 `disableConfirmation()` 方法。 这些方法会更新 `isConfirmationNeeded` 属性：

```typescript
closingBehavior.enableConfirmation();
console.log(closingBehavior.isConfirmationNeeded); // true  

closingBehavior.disableConfirmation();
console.log(closingBehavior.isConfirmationNeeded); // false
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                            | 监听器                        | 触发条件                         |
| ----------------------------- | -------------------------- | ---------------------------- |
| `change`                      | `() => void`               | 组件中的某些部分发生了变化                |
| `change:isConfirmationNeeded` | `(value: boolean) => void` | `isConfirmationNeeded` 属性已更改 |
