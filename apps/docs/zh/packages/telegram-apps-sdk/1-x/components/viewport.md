# `视口 - Viewport {#Viewport}`

实现小程序 [viewport](../../../../platform/viewport.md) 功能。

## 初始化

要初始化组件，请使用 `initViewport` 函数：

```typescript
import { initViewport } from '@telegram-apps/sdk';

const [viewport] = initViewport();  
```

::: info

由于 Viewport 无法同步实例化，因此该函数返回一个 promise 作为元组中的第一个
值，在检索实际视口状态时，该值将被解析。

:::

## 尺寸

应用程序可以只显示小程序的上半部分，下半部分则保留在
屏幕区域之外。 从这个位置，用户可以将小程序 "拉 "到最大高度，而
开发人员也可以通过调用 `expand` 方法（使用`isExpanded`属性获取当前
的扩展状态）来完成同样的操作：

```typescript
const [viewport] = initViewport();

const vp = await viewport;

if (!vp.isExpanded) {
    vp.expand(); // will expand the Mini App, if it's not
}
```

随着小程序位置的变化，
可视区域的当前高度值也会实时更新。

:::info
请注意，该值（`height`）的刷新率不足以平滑地跟踪
窗口的下边框。 不应将界面元素固定在
可视区域的底部。 为此，使用 `stableHeight` 字段的值更为合适。
:::

## 获取实际数据

要获取实际的视口信息，开发人员可以使用 `requestViewport` 函数：

```typescript
import {requestViewport} from '@telegram-apps/sdk';

requestViewport().then((data) => {
    // Output:
    // { height: 122, isExpanded: false, width: 375, isStateStable: true }
    console.log(data);
});
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                    | 监听器                               | 触发条件                  |
| --------------------- | --------------------------------- | --------------------- |
| `change`              | `() => void`                      | 组件中的某些部分发生了变化         |
| `change:height`       | `(height: number) => void`        | `height` 属性已更改        |
| `change:isExpanded`   | `(isExpanded: boolean) => void`   | 更改了 `isExpanded` 属性   |
| `change:stableHeight` | `(stableHeight: boolean) => void` | 更改了 `stableHeight` 属性 |
| `change:width`        | `(width: boolean) => void`        | 更改了 `width` 属性        |
