---
outline:
  - 2
  - 3
---

# 组件

## 启动

根据该软件包的设计，开发人员可以完全控制其生命周期，包括初始化过程。  这意味着没有预初始化的全局组件
供开发人员使用。 他们必须自己创建组件。

为简化开发人员的工作流程，该软件包包含一些特殊函数，其前缀为
`init` 字符串。 这些函数会返回一个元组，其中包含初始化组件
的一个实例和一个清理函数，清理函数会移除该 init 函数产生的所有副作用。

下面就是一个例子：

```typescript
import { initBackButton, initMainButton } from '@telegram-apps/sdk';

const [mb, cleanupMb] = initMainButton();
const [bb, cleanupBb] = initBackButton();

// Clicking the MainButton hides it and shows the BackButton.
mb.on('click', () => {
  mb.hide();
  bb.show();
});

// Clicking the BackButton hides it and shows the MainButton.
bb.on('click', () => {
  mb.show();
  bb.hide();
});

// Configure the MainButton.
mb
  .setBgColor('#ff0000')
  .setTextColor('#ffffff')
  .setText('Expand')
  .enable()
  .show();

// When we don't need BackButton and MainButton anymore, we can 
// perform a cleanup. After calling a cleanup, the initialized 
// component will not receive any events.
cleanupMb();
cleanupBb();
```

:::info

请注意，只要本地没有
相关信息，就不能同步实例化某些组件。  使用每个组件的文档，了解
组件如何初始化。

:::

## 事件

组件实例通过 `on` 和 `off` 方法使用常见的事件监听方式。建议在调用某些组件方法之前使用该功能，只要
能确保开发人员使用该功能。 各组件支持的方法列表见
各组件文档。

```typescript
import { initBackButton } from '@telegram-apps/sdk';

const [bb] = initBackButton();

// Clicking the BackButton hides it and shows the MainButton.
bb.on('click', () => {
  console.log('BackButton clicked.');
});
```

您可以在组件文档中找到支持的事件列表。

## 方法支持 {#methods-support}

几乎每个组件都能检查当前
小程序版本是否支持其方法。  要检查是否支持某些方法，开发者应使用组件实例的 `supports()` 函数。 例如：

```typescript
import { BackButton } from '@telegram-apps/sdk';

let bb = new BackButton('6.0', ...);
bb.supports('show'); // false

bb = new BackButton('6.3', ...);
bb.supports('hide'); // true
```

某些组件支持附加方法 `supportsParam` ，可检查
方法<ins>参数</ins>是否受支持：

```typescript
import { Utils } from '@telegram-apps/sdk';

let utils = new Utils('6.0', ...);
utils.supportsParam('openLink.tryInstantView'); // false

utils = new Utils('6.10', ...);
utils.supportsParam('openLink.tryInstantView'); // true
```

::: tip

建议在调用某些组件方法之前使用该功能，这样
能确保开发人员可以使用该功能。 各组件支持的方法列表见
各组件文档。

:::
