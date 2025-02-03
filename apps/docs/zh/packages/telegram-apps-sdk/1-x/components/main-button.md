# `主按钮`

执行 Telegram 小程序 [主按钮](../../../../platform/main-button.md)。

## 初始化

要初始化组件，请使用 `initMainButton` 函数：

```typescript
import { initMainButton } from '@telegram-apps/sdk';

const [mainButton] = initMainButton();  
```

## 按钮可见性

要控制主按钮的可见性，开发人员可以使用 `show()` 和 `hide()` 等方法。
它们都会更新组件的 `isVisible` 属性：
它们都会更新组件的 `isVisible` 属性：

```typescript
mainButton.show();
console.log(mainButton.isVisible); // true  

mainButton.hide();
console.log(mainButton.isVisible); // false  
```

## 加载器

主按钮内部可以显示一个加载器。  要控制其可见性，
使用 `showLoader()` 和 `hideLoader()` 方法。 `isLoaderVisible` 属性将被更改。

```typescript
mainButton.showLoader();
console.log(mainButton.isLoaderVisible); // true  

mainButton.hideLoader();
console.log(mainButton.isLoaderVisible); // false
```

## 激活状态

可以通过调用 `disable()` 和 `enable()` 方法启用或禁用主按钮。
这两个方法都会更新 `isEnabled` 属性。 这两个方法都会更新 `isEnabled` 属性。

```typescript
mainButton.enable();
console.log(mainButton.isEnabled); // true  

mainButton.disable();
console.log(mainButton.isEnabled); // false
```

启用主按钮后，用户就可以点击它。 启用主按钮后，用户就可以点击它。 因此，主按钮将
接收`click`事件。

## 背景颜色

要更新主按钮的背景颜色，请使用 `setBackgroundColor(color: RGB)` 方法。
将更新 `backgroundColor` 属性。 它将更新 `backgroundColor` 属性。

```typescript
mainButton.setBackgroundColor('#ffffaa');
console.log(mainButton.color); // '#ffffaa'
```

## 文字颜色

要更新主按钮文本的颜色，请使用 `setTextColor(color: RGB)` 方法。  它将更新
`textColor`属性。

```typescript
mainButton.setTextColor('#cca233');
console.log(mainButton.textColor); // '#cca233'
```

## 文本

要更新主按钮文本，请使用 `setText(text: string)` 方法。  它将更新 `text`
属性。

```typescript
mainButton.setText('Submit');
console.log(mainButton.text); // 'Submit'
```

## 设置多个属性

有时，连续设置几个主按钮参数可能会导致
UI 出现问题。  为了避免这个问题，可以使用 `setParams` 方法：

```typescript
mainButton.setParams({
  backgroundColor: '#aa1388',
  text: 'Stop',
  isVisible: true,
});
```

## 事件

可被 [跟踪](#events) 的事件列表：

| 事件                       | 监听器                        | 触发条件                     |
| ------------------------ | -------------------------- | ------------------------ |
| `click`                  | `() => void`               | 点击了主按钮                   |
| `change`                 | `() => void`               | 组件中的某些部分发生了变化            |
| `change:backgroundColor` | `(value: RGB) => void`     | 更改了 `backgroundColor` 属性 |
| `change:isLoaderVisible` | `(value: boolean) => void` | 更改了 `isLoaderVisible` 属性 |
| `change:isEnabled`       | `(value: boolean) => void` | 已更改 `isEnabled` 属性       |
| `change:isVisible`       | `(value: boolean) => void` | 更改了 `isVisible` 属性       |
| `change:text`            | `(value: string) => void`  | 更改了 `text` 属性            |
| `change:textColor`       | `(value: RGB) => void`     | 更改了 `textColor` 属性       |
