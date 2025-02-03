# @telegram-apps/react-router-integration

<p style="display: inline-flex; gap: 8px">
  <a href="https://npmjs.com/package/@telegram-apps/react-router-integration">
    <img src="https://img.shields.io/npm/v/@telegram-apps/react-router-integration?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/react-router-integration"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/react-router-integration">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

Telegram 小程序 [Navigator](telegram-apps-sdk/1-x/navigation.md) 和 [react-router-dom](https://www.npmjs.com/package/react-router-dom) 的集成.

## 安装

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/react-router-integration
```

```bash [npm]
npm i @telegram-apps/react-router-integration
```

```bash [yarn]
yarn add @telegram-apps/react-router-integration
```

:::

## 使用方法

目前，该软件包只提供一个函数，用于创建
`react-router-dom` 路由器的集成 - `useIntegration`。

下面是它的使用方法：

```jsx
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useEffect, useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { IndexPage } from './IndexPage.js';

function App() {
  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route path={'/'} component={IndexPage}/>
        <Route path={'*'} element={<Navigate href={'/'}/>}/>
      </Routes>
    </Router>
  );
}
```

您可以通过
我们的 [React 模板](https://github.com/Telegram-Mini-Apps/reactjs-template) 了解更多关于如何使用它的实际应用。
