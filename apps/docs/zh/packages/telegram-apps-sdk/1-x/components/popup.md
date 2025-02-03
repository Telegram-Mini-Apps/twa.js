# `弹出窗口`

执行 Telegram 小程序 [popup](../../../../platform/popup.md)。

## 初始化

要初始化组件，请使用 `initPopup` 函数：

```typescript
import { initPopup } from '@telegram-apps/sdk';

const popup = initPopup();  
```

## 打开新弹出式窗口

要打开弹出窗口，需要调用 `open` 方法，指定弹出窗口的属性：标题、
信息和最多 3 个按钮的列表。

```typescript
popup
  .open({
    title: 'Hello!',
    message: 'Here is a test message.',
    buttons: [{ id: 'my-id', type: 'default', text: 'Default text' }],
  })
  .then(buttonId => {
    console.log(
      buttonId === null 
        ? 'User did not click any button'
        : `User clicked a button with ID "${buttonId}"`
    );
  });

console.log(popup.isOpened); // true
```

该方法返回一个 Promise，当按钮被点击时，该 Promise 会被解析为点击的按钮标识符。 在
此情况下，如果用户没有点击任何按钮，该方法将返回 `null`。

## 事件

可被 [跟踪](#events) 的事件列表：

| 事件                 | 监听器                        | 触发条件              |
| ------------------ | -------------------------- | ----------------- |
| `changed`          | `() => void`               | 组件中的某些部分发生了变化     |
| `changed:isOpened` | `(value: boolean) => void` | 更改了 `isOpened` 属性 |

## 方法支持 {#methods-support}

方法列表，可用于 [支持检查](#methods-support)：`open`
