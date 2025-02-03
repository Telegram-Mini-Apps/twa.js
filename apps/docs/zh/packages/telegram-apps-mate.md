# @telegram-apps/mate

Mate 是 Telegram 小程序
平台为开发人员提供的多功能工具，可以解决各种问题。

## 安装

要开始使用 Mate，需要安装 `@telegram-apps/mate`
软件包。  开发人员可以在本地和全球范围内进行开发：

:::code-group

```bash [pnpm]
# Locally.
pnpm i -D @telegram-apps/mate
# Globally.
pnpm i -g @telegram-apps/mate
```

```bash [npm]
# Locally.
npm i -D @telegram-apps/mate
# Globally.
npm i -g @telegram-apps/mate
```

```bash [yarn]
# Locally.
yarn add -D @telegram-apps/mate
# Globally.
yarn global add @telegram-apps/mate
```

:::

安装后，可通过 `mate` CLI 工具访问该软件包：

```bash
mate --help
```

> [!TIP]
> 强烈建议在本地安装软件包，以避免
> 对软件包版本的混淆，并确保
> 开发团队内部使用体验的一致性。

## 免安装使用

也可以通过使用 `pnpm` 或 `npx` 不安装软件包：

:::code-group

```bash [pnpm]
pnpm dlx @telegram-apps/mate@latest --help
```

```bash [npx]
npx @telegram-apps/mate@latest --help
```

:::
