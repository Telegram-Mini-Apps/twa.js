# `BrowserNavigator`

`BrowserNavigator` 是一个使用浏览器历史 API 实现导航的类。 导航器对标准导航器进行了扩展，提供了基本的导航功能和专门用于
浏览器历史记录的逻辑。

## 构造函数

要创建该类的实例，开发人员可以使用该类的构造函数，该构造函数接受历史
项、指向历史项列表条目的光标（索引）以及其他选项：

```typescript
import { BrowserNavigator } from '@telegram-apps/sdk';

new BrowserNavigator(['/index'], 0);
new BrowserNavigator([{ pathname: '/a' }, { pathname: '/b' }], 1);
```

:::warning
如果传入的历史项目列表为空，或者游标指向一个不存在的项目，
构造函数将抛出一个适当的错误。
:::

### `postEvent`

`postEvent` 函数允许替换代表
导航器调用 小程序方法的函数。

```ts
const n = new BrowserNavigator(['/'], 0, {
  postEvent(method, payload) {
    console.log('postEvent:', method, payload);
  },
});
```

### `hashMode`

`hashMode` 属性允许开发人员设置导航器使用的导航模式。 允许的值有：`classic`（`#pathname`）、`slash`（`#/pathname`）和`null`。 `hashMode` 属性允许开发人员设置导航器使用的导航模式。
允许的值有：`classic`（`#pathname`）、`slash`（`#/pathname`）和`null`。 传递 `null` 值
会将导航器从 SPA 模式切换到 MPA 模式，使用整个 `href` 而不是位置的哈希部分
。

默认情况下，导航器使用 `classic` 模式。

```ts
const n = new BrowserNavigator(['/'], 0, {
  hashMode: 'slash'
});
```

### `base`

`base` 属性负责解析路由和渲染路径，假定它们必须
以指定的 `base` 值开始。

```ts
const n = new BrowserNavigator(['/'], 0, {
  hashMode: null,
  base: '/solidjs-template',
});

n.renderPath('/home'); // -> /solidjs-template/home
```

该值只有在使用 MPA 模式时才有用。

## `createBrowserNavigatorFromLocation`

为了简化创建 `BrowserNavigator` 的过程，软件包提供了
`createBrowserNavigatorFromLocation` 方法。  推送新的历史项目。 该方法用
推送的条目替换当前条目之后的所有条目。 请注意，传递的项目总是相对的。 如果要将其用作绝对值，请使用
`/` 前缀。 例如：`/absolute`, `{ pathname: '/absolute' }`.

```typescript
import { createBrowserNavigatorFromLocation } from '@telegram-apps/sdk';

const navigator = createBrowserNavigatorFromLocation({
  hashMode: 'slash',
});
```

## `initNavigator`

`initNavigator` 函数负责使用先前保存的导航器状态创建一个 `BrowserNavigator` 实例
。  它还会自动将其保存在会话存储
中，以便将来恢复状态。

该函数接受会话存储密钥名称（其中将包含导航器状态）和
可选对象（代表导航器构造器选项）。

```ts
import { initNavigator } from '@telegram-apps/sdk';

const n = initNavigator('app-navigator-state', {
  hashMode: 'slash',
});
```

如果函数无法使用会话存储恢复导航器，它将
使用 `createBrowserNavigatorFromLocation` 函数。

## 连接

创建 `BrowserNavigator` 实例并使用其方法不会自动更新
浏览器历史记录。  要做到这一点，开发人员应将其附加到系统中。 在此之前，
导航器只会更新其内部状态，并通知所有订阅者有关更改。 为了防止多次创建此类型的导航器并且每个导航器都试图通过其内部状态控制浏览器历史记录，必须手动附加。

要允许导航器控制浏览器的历史记录，必须通过 `attach` 方法将其附加：

```typescript
import { BrowserNavigator } from '@telegram-apps/sdk';

const navigator = new BrowserNavigator(...);

navigator.attach().then(() => {
  console.log('Attachment completed');
});
```

该方法返回一个 Promise，当附加方法完成时，Promise 将被解析。

要阻止导航器修改浏览器的历史记录，请使用 `detach` 方法：

```typescript
navigator.detach();
```

## 导航

导航器为开发人员提供了一系列操作导航历史记录的方法。

### `back`

历史倒退 1.

```typescript
navigator.back();
```

### `forward`

历史向前推移 1.

```typescript
navigator.forward();
```

### `go`

按指定的 delta 值更改当前活动的历史项目索引。 如果更新后的索引指向一个不存在的历史项，该方法不会更改
索引。 在指定 `fit` 参数之前。 如果指定了它，该方法会调整传入的 delta，使
适合`[0, history.length - 1]`范围。 

```typescript
// Goes back in history by 3 entries.
navigator.go(-3);

// Will surely do nothing in real-world applications.
navigator.go(-100000);

// Will go back to the oldest entry.
navigator.go(-100000, true);

// Will go forward to the newest entry.
navigator.go(100000, true);
```

### `goTo`

转到指定的索引。 如果传递的索引超出范围，该方法将不起任何作用。

如果指定了 `fit` 选项，并且索引超出了界限，那么它将被调整为最接近
的界限。

```typescript
// Will do nothing.
navigator.goTo(-1);

// Will go to the oldest entry.
navigator.goTo(0);

// Will surely do nothing in real-world applications.
navigator.goTo(100000);

// Will go back to the oldest entry.
navigator.goTo(-100000, true);

// Will go forward to the newest entry.
navigator.goTo(100000, true);
```

### `push`

推送新的历史项目。 该方法用
推送的条目替换当前条目之后的所有条目。 请注意，传递的项目总是相对的。 如果要将其用作绝对值，请使用
`/` 前缀。 例如：`/absolute`, `{ pathname: '/absolute' }`.

要创建最终路径，导航器会使用 URL 类构造函数中的一种方法，根据当前路径解析
路径。

在接下来的示例中，我们假设当前条目为 `/home/blog`。

#### 绝对路径名

指定绝对路径不会将其与当前路径合并，而是使用
的完整路径：

```typescript
navigator.push('/database');
// or
navigator.push({ pathname: '/database' });
// Navigator will add a new entry, and the current one becomes /database
```

#### 相对路径名

指定相对路径名的行为与浏览器中的行为相同：

```typescript
navigator.push('license');
// or
navigator.push({ pathname: 'license' });
// Navigator will add a new entry, and the current one becomes /home/license
```

#### 搜索

要添加带查询参数的条目，请使用问号 (`?`) 或 `search` 条目属性：

```typescript
navigator.push('?id=1');
// or
navigator.push({ search: '?id=1' });
// Navigator will add a new entry, and the current one becomes /home/blog?id=1
```

:::info
推送带有不同查询参数或缺少查询参数的新路径名将导致当前
查询参数丢失。  为防止出现这种情况，开发人员应再次传入它们。
:::

#### Hash

添加条目的Hash部分的逻辑与 [search](#search)相同，但使用的是
hashtag (`#`) 和 `hash` 条目属性。

```typescript
navigator.push('#introduction');
// or
navigator.push({ hash: '#introduction' });
// Navigator will add a new entry, and the current 
// one becomes /home/blog#introduction
```

### `replace`

`replace` 方法的功能与 [push](#push) 方法类似，但它不会创建新的
条目。  相反，它取代了当前的版本。

## 属性

### `index`

当前历史光标。

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.index; // 0
```

### `id`

当前历史项目标识符。  转到指定的索引。 如果传递的索引超出范围，该方法将不起任何作用。

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.id; // 'abb721'

const navigator2 = new BrowserNavigator([{ id: 'a', pathname: '/' }], 0);
navigator2.id; // 'a'
```

### `hash`

当前历史项目哈希值。

```typescript
const navigator = new BrowserNavigator(['/#jungle'], 0);
navigator.hash; // "#jungle"
```

### `hasPrev`

如果导航器在当前项目之前有项目，则为 True。

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.hasPrev; // false

const navigator2 = new BrowserNavigator(['/a', '/b'], 1);
navigator2.hasPrev; // true
```

### `hasNext`

如果导航器在当前项目之后还有项目，则为 True。

```typescript
const navigator = new BrowserNavigator(['/'], 0);
navigator.hasNext; // false

const navigator2 = new BrowserNavigator(['/a', '/b'], 0);
navigator2.hasNext; // true
```

### `history`

安全修改导航历史记录。

```typescript
const navigator = new BrowserNavigator(['/a#a-hash', '/b?b-query=1'], 0);
navigator.history;
// [
//   { pathname: '/a', hash: '#a-hash', search: '', id: 'ahJJ123' },
//   { pathname: '/b', hash: '', search: '?b-query=1', id: 'dd82' },
// ]
```

### `path`

路径，包括路径名、搜索和哈希值。

```typescript
const navigator = new BrowserNavigator([{
  pathname: '/a',
  hash: '#mama',
  search: '?joe',
}], 0);
navigator.path; // '/a?joe#mama'
```

### `pathname`

当前路径名。 总是以斜线开头。

```typescript
const navigator = new BrowserNavigator([{
  pathname: '/a',
  hash: '#mama',
  search: '?joe',
}], 0);
navigator.pathname; // '/a'
```

### `search`

当前查询参数。

```typescript
const navigator = new BrowserNavigator([{
  pathname: '/a',
  hash: '#mama',
  search: '?joe',
}], 0);
navigator.search; // '?joe'
```

### `state`

当前历史项目状态。

```typescript
const navigator = new BrowserNavigator([{ state: 'test' }], 0);


navigator.state; // 'test'
```

## 事件

`BrowserNavigator` 提供了 `on` 和 `off` 方法来管理事件监听器。  目前，可用于监听的
事件只有 `change`。 `change` 事件的有效载荷是一个对象，包含
以下属性：

- `navigator: BrowserNavigator`: 相关导航器实例。
- `delta: number`: 当前活动项目光标的 delta。
- `from: { pathname: string; hash: string; search: string; id: string; state?: State }`:
  以前活动的历史项目。
- `to`：结构与 `from` 相同的对象，代表当前活动的历史项目。

### 添加事件监听器

要为 `change` 事件添加事件监听器，请使用 `on` 方法：

```typescript
const removeEventListener = navigator.on('change', (ev) => {
  console.warn('Navigation state changed', ev);
});
```

### 删除事件监听器

要移除事件监听器，请调用 `on` 方法返回的函数：

```typescript
removeEventListener();
```

或者，您也可以使用导航器的 `off` 方法：

```typescript
function listener(ev) {
  console.warn('Navigation state changed', ev);
}
navigator.on('change', listener);
navigator.off('change', listener);
```

## 其他方法

### `renderPath`

`renderPath` 方法将导航器的 `base` 属性与给定的路径数据相结合，并应用
导航器的导航模式。 该方法以字符串形式返回完全渲染的路径。 该方法以字符串形式返回完全渲染的路径。

```typescript
const n = new BrowserNavigator(['/'], 0, {
  hashMode: 'slash',
});
n.renderPath('/test'); // '#/test'

const n2 = new BrowserNavigator(['/'], 0, {
  base: '/my-base',
  hashMode: 'slash',
});
n2.renderPath('/test'); // '#/my-base/test'

const n3 = new BrowserNavigator(['/'], 0, {
  base: '/my-base',
  hashMode: null,
});
n3.renderPath('/test'); // '/my-base/test'
```

### `parsePath`

`parsePath` 方法会根据当前导航类型解析所提供的路径，并以对象形式返回
。  这种方法有助于了解导航器如何解释给定路径。

```typescript
const n = new BrowserNavigator(['/'], 0);
n.parsePath('/test');
// { pathname: '/', search: '', hash: '' }

n.parsePath('/test#abc');
// { pathname: '/abc', search: '', hash: '' }

n.parsePath('/test#abc?query#some-hash');
// { pathname: '/abc', search: '?query', hash: '#some-hash' }

const n2 = new BrowserNavigator(['/'], 0, { hashMode: null });
n2.parsePath('/test');
// { pathname: '/test', search: '', hash: '' }

n2.parsePath('/test#abc');
// { pathname: '/test', search: '', hash: '#abc' }

n2.parsePath('/test?query#abc');
// { pathname: '/test', search: '?query', hash: '#abc' }
```
