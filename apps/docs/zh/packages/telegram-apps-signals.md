# @telegram-apps/signals

<p style="display: flex; gap: 8px; min-height: 20px">
  <a href="https://npmjs.com/package/@telegram-apps/signals">
    <img src="https://img.shields.io/npm/v/@telegram-apps/signals?logo=npm"/>
  </a>
  <img src="https://img.shields.io/bundlephobia/minzip/@telegram-apps/signals"/>
  <a href="https://github.com/Telegram-Mini-Apps/telegram-apps/tree/master/packages/signals">
    <img src="https://img.shields.io/badge/source-black?logo=github"/>
  </a>
</p>

我们在整个 `@telegram-apps` 软件包中使用的 signals 实现。

## 安装

::: code-group

```bash [pnpm]
pnpm i @telegram-apps/signals
```

```bash [npm]
npm i @telegram-apps/signals
```

```bash [yarn]
yarn add @telegram-apps/signals
```

:::

## Signal

`signal` 函数是最简单的 signal 构造函数，被其他软件包函数所使用。 要
创建新 signal，只需传递初始值即可：

```ts
import { signal } from '@telegram-apps/signals';

const isVisible = signal(false);
```

返回值代表一个具有实用方法的函数。  要跟踪 signal 变化，请使用 `sub` 方法。 它返回一个函数，用于移除绑定的
监听器。 监听器接受两个参数：当前值和上一个值。

```ts
console.log('The element is', isVisible() ? 'visible' : 'invisible');
```

该函数还接受选项作为第二个参数。 开发人员可以指定
`equals` 函数，该函数接受当前值和输入值，如果认为它们相等，则返回 true
。

```ts
const s = signal(10, {
  equals(current, next) {
    // Will not update the signal if the next value is
    // higher than the current one.
    return next > current;
  }
});
s.set(20); // will not update the signal
s.set(5); // will update the signal
```

### `set`

要设置新值，请使用 `set` 方法：

```ts
isVisible.set(true);
```

### `sub`

要跟踪 signal 变化，请使用 `sub` 方法。 它返回一个函数，用于移除绑定的
监听器。 监听器接受两个参数：当前值和上一个值。

```ts
const removeListener = isVisible.sub((current, prev) => {
  console.log('Value changed from', prev, 'to', current);
});

// Remove the listener whenever needed.
removeListener();
```

要只调用监听器一次，请使用第二个：

```ts
function listener(current: boolean, prev: boolean) {
  console.log('Value changed from', prev, 'to', current);
}

isVisible.sub(listener, true);
// or
isVisible.sub(listener, { once: true });
```

### `unsub`

另外，要移除监听器，开发人员可以使用 `unsub` 方法：

```ts
function listener(current: boolean, prev: boolean) {
  console.log('Value changed from', prev, 'to', current);
}

isVisible.sub(listener);

// Remove the listener whenever needed.
isVisible.unsub(listener);
```

### `unsubAll`

要移除所有监听器，请使用 `unsubAll` 方法：

```ts
isVisible.unsubAll();
```

::: info

此方法不会移除计算 signal 添加的监听器。

:::

### `reset`

要恢复到最初指定的值，请使用 `reset` 方法：

```ts
import { signal } from '@telegram-apps/signals';

const isVisible = signal(false);
isVisible.set(true); // isVisible becomes true
isVisible.reset(); // isVisible becomes false again
```

### `destroy`

当不再需要该 signal 且该 signal 没有被任何计算 signal 监听时，开发者
可以使用 `destroy` 方法强制移除所有监听者：

```ts
isVisible.destroy();
```

## Computed

`computed` 函数构建了一个computed signal，当被调用signal的任何
发生变化时，该 signal 会自动重新计算。

这里有一个例子：

```ts
import { signal, computed } from '@telegram-apps/signals';

const a = signal(2);
const b = signal(2);
const sum = computed(() => a() + b()); // 4

a.set(5); // sum becomes 7
b.set(5); // sum becomes 10
```

返回值代表一个缺少 `set` 和 `reset` 方法的 signal 。

## 批量更改

`batch` 函数创建一个作用域，在此对 signal 突变进行批处理。

当开发人员希望防止计算 signal 在几个
相关 signal 连续变化时重新计算时，该功能非常有用。

```ts
import { signal, computed, batch } from '@telegram-apps/signals';

const a = signal(1);
const b = signal(2);
const c = signal(3);
const sum = computed(() => a() + b() + c()); // 6

// Without batching, re-computation happens 3 times:
a.set(2); // sum recomputes and becomes 7
b.set(3); // sum recomputes and becomes 8
c.set(4); // sum recomputes and becomes 9

// Reset each signal.
a.reset();
b.reset();
c.reset();
// Note: reset calls the set method, which also causes
// the sum signal to recompute.

// Now, let's optimize using the batch function:
batch(() => {
  a.set(2);
  b.set(3);
  c.set(4);
});
// At this point, sum will recompute only once because
// batch causes the sum signal to wait for the function to complete,
// and then it triggers the recomputation.
console.log(sum()); // 9
```
