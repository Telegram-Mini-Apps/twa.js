# @telegram-apps/solid-router-integration

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/solid-router-integration">
    <img src="https://img.shields.io/npm/v/@telegram-apps/solid-router-integration?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/solid-router-integration"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/solid-router-integration">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Telegram 小程序 [Navigator](telegram-apps-sdk/1-x/navigation.md) 与 [@solidjs/router](https://www.npmjs.com/package/@solidjs/router) 的集成 。

## 安装

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/solid-router-integration
```

```bash [npm]
npm i @telegram-apps/solid-router-integration
```

```bash [yarn]
yarn add @telegram-apps/solid-router-integration
```

:::

## 使用方法

目前，该软件包只提供了一个函数，用于创建
`@solidjs/router` 路由器的集成 - `createRouter`。

下面是它的使用方法：

```jsx
import { Routes, Route, Navigate } from '@solidjs/router';
import { onCleanup } from 'solid-js';
import { initNavigator } from '@telegram-apps/sdk-solid';
import { createRouter } from '@telegram-apps/solid-router-integration';

import { IndexPage } from './IndexPage.js';

function App() {
  // We should create navigator to pass it to integration creation.
  const navigator = initNavigator('app-navigator-state');

  // Then, to allow this navigator update current browser history, 
  // we should attach it. Otherwise, it will work in memory mode.
  void navigator.attach();
  onCleanup(() => {
    navigator.detach();
  });

  const Router = createRouter(navigator);

  return (
    <Router>
      <Routes>
        <Route path={'/'} component={IndexPage}/>
        <Route path={'*'} element={<Navigate href={'/'}/>}/>
      </Routes>
    </Router>
  );
}
```

您可以通过
我们的 [Solid 模板](https://github.com/Telegram-Mini-Apps/solidjs-template) 了解更多有关如何使用它的实际应用。
