# `主题参数`

该组件包含 Telegram 应用程序当前使用的
[主题](../../../../platform/theming.md) 信息。

## 初始化

要初始化组件，请使用 `initThemeParams` 函数：

```typescript
import { initThemeParams } from '@telegram-apps/sdk';

const [themeParams] = initThemeParams();  
```

## 请求实际数据 {#request-actual-data}

要获取实际的主题参数信息，开发人员可以使用 `requestThemeParams`
函数：

```typescript
import { requestThemeParams } from '@telegram-apps/sdk';

requestThemeParams.then(console.log);

// Output:
// { bgColor: '#ffaabb', ... }
```

## 颜色

开发人员可以使用 `get` 方法获取主题颜色：

```typescript
themeParams.get('bgColor');
themeParams.get('packageUnknownColor');
```

要通过一个对象获取所有颜色，请使用 `getState` 方法：

```typescript
themeParams.getState();
// Output:
// {
//   accentTextColor: '#aa1399',
//   bgColor: '#baac12',
//   linkColor: '#887722'
//   packageUnknownColor: '#676767,
// }
```

`ThemeParams` 组件可直接访问颜色列表：

- `accentTextColor: RGB | undefined`
- `bgColor: RGB | undefined`
- `buttonColor: RGB | undefined`
- `buttonTextColor: RGB | undefined`
- `destructiveTextColor: RGB | undefined`
- `headerBgColor: RGB | undefined`
- `hintColor: RGB | undefined`
- `linkColor: RGB | undefined`
- `secondaryBgColor: RGB | undefined`
- `sectionBgColor: RGB | undefined`
- `sectionHeaderTextColor: RGB | undefined`
- `subtitleTextColor: RGB | undefined`
- `textColor: RGB | undefined`

例如

```typescript
themeParams.accentTextColor; // '#aa1399'
```

## 事件 {#events}

可被 [跟踪](#events) 的事件列表：

| 事件                   | 监听器                    | 触发条件          |
| -------------------- | ---------------------- | ------------- |
| `change`             | `() => void`           | 组件中的某些部分发生了变化 |
| `change:{theme_key}` | `(value: RGB) => void` | 更改指定键的颜色      |
