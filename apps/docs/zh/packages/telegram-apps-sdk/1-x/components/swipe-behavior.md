# `滑动行为`

执行 Telegram 小程序 [滑动行为](.../.../.../.../platform/swipe-behavior.md) 功能。

## 初始化

要初始化组件，请使用`initSwipeBehavior`函数：

```typescript
import { initSwipeBehavior } from '@telegram-apps/sdk';

const [swipeBehavior] = initSwipeBehavior();  
```

## 垂直滑动 {#vertical-swipe}

默认情况下，用户可以通过向下滑动应用程序来隐藏应用程序。
为防止可能出现的关闭，可通过调用 `disableVerticalSwipe()`
方法禁用此行为，或通过 `enableVerticalSwipe()` 方法启用此行为。  反过来，
这两个方法都会更新 `isVerticalSwipeEnabled` 属性：

```typescript
swipeBehavior.enableVerticalSwipe();
console.log(swipeBehavior.isVerticalSwipeEnabled); // true  

swipeBehavior.disableVerticalSwipe();
console.log(swipeBehavior.isVerticalSwipeEnabled); // false
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                              | 监听器                        | 触发条件                            |
| ------------------------------- | -------------------------- | ------------------------------- |
| `change`                        | `() => void`               | 组件中的某些部分发生了变化                   |
| `change:isVerticalSwipeEnabled` | `(value: boolean) => void` | 更改了 `isVerticalSwipeEnabled` 属性 |

## 方法支持 {#methods-support}

方法列表，可用于 [支持检查](#methods-support)：`disableVerticalSwipe` 和 `enableVerticalSwipe`。
