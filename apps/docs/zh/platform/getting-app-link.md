---
outline:
  - 2
  - 4
---

# 获取应用程序链接

简而言之，所有小程序都是典型的网络应用程序，每个应用程序都需要自己的 URL，
，以检索和显示应用程序的内容。 简而言之，所有小程序都是典型的网络应用程序，每个应用程序都需要自己的 URL，以检索和显示应用程序的内容。 Telegram 不为
开发者的应用程序提供任何存储空间，因此开发者有责任为其
应用程序创建存储空间并获取 URL。

Telegram 只接受具有有效 SSL 证书并使用 HTTPS 协议的链接。  与
生产环境不同，[测试环境](test-environment.md) 允许直接使用 IP。

::: info

不过，开发人员也可以使用任何其他主机。 请务必记住，
应用程序的链接必须使用 HTTPS 协议，并具有有效的 SSL 证书。 要获取免费的
，请考虑使用 [certbot](https://certbot.eff.org/pages/about)。 尽管我们可以使用测试环境来开发应用程序，但环境
往往无法显示出良好的性能。 如果在
测试环境中遇到低性能问题，请考虑切换到生产环境。

:::

## 引言

在深入了解本指南之前，重要的是要了解为什么需要一些链接。  接下来，您需要创建一条连接开发服务器的隧道。 每个用户至少有一个免费的静态
域名，可用于 BotFather。 要找到自己的网站，请使用
此 [链接](https://dashboard.ngrok.com/cloud-edge/domains)。

1. **用于开发**：这些链接是临时的，仅用于通过
   开发服务器显示应用程序。  它们还可用于与其他用户共享，以显示当前的进度。
2. **用于生产**：这些链接用于在生产模式下打开可用于生产的
   应用程序，通常由普通用户访问。

本指南涵盖这两种情况。 本指南涵盖这两种情况。 您可以在
[template for React.js](https://github.com/telegram-mini-apps/reactjs-template) 中找到真正的链接生成和使用方法。

本文档接下来的章节将使用 [Vite](https://vitejs.dev)作为
应用程序的基本打包程序。

## 关于开发

应用程序开发过程被认为是永无止境的。  长期应用的
总是需要维护的，为此，宜通过降低
的准入门槛和减少由此产生的认知负荷来完善这一过程。

开发链接用于查看应用程序当前的开发状态。  这些链接可
分为两类：本地链接和远程链接。 让我们仔细看看。

::: warning

`本地` 链接 (`https://localhost:5173`)指的是本地开发服务器。 在浏览器、Telegram for macOS、Telegram Desktop 或 Telegram Web A/K 中打开此链接
，会出现一条与不信任证书相关的警告
消息。 开发链接不应在生产中使用。 生产链接不应是动态的
，必须引用提供小程序内容的服务器。

:::

### 在本地环境

用于开发的本地链接是指仅对当前设备可用的链接。

流行的捆绑程序（如 [Vite](https://vitejs.dev/)）提供了运行本地服务器的功能，用于
开发。 因此，您将获得一个可在 BotFather 中使用或直接在
浏览器中打开的 IP。

以下是运行开发服务器并返回开发链接的基本 Vite 配置。

```ts
import { defineConfig } from 'vite';

export default defineConfig();
```

你会在控制台中看到一条信息：

```bash
VITE ready in 112 ms

➜  Local:   http://localhost:5173
➜  press h + enter to show help
```

现在，您可以在浏览器中打开 `本地` 链接 (`http://localhost:5173`)，查看
应用程序。

您可能已经注意到，该链接不符合 BotFather 的要求，因为它必须使用
HTTPS 协议。  现在，我们来获取 HTTPS 链接。

#### Vite 插件

Vite 的生态系统提供了
[@vitejs/plugin-basic-ssl](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl) 插件。
允许在指定域上使用自签名 SSL 证书启动应用程序。 允许在指定域上使用自签名 SSL 证书启动应用程序。

下面是一个基本例子：

```ts
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  plugins: [
    basicSsl(),
  ],
});
```

您可能会发现还有一些其他有用的选项。 要了解更多相关信息，请访问
插件的 [文档](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl) 。

启动开发服务器后，您会看到类似的信息：

```bash
VITE ready in 275 ms

➜  Local:   https://localhost:5173
➜  press h + enter to show help
```

`本地` 链接 (`https://localhost:5173`)指的是本地开发服务器。 在浏览器、Telegram for macOS、Telegram Desktop 或 Telegram Web A/K 中打开此链接
，会出现一条与不信任证书相关的警告
消息。

<img
src="/untrusted-cert-warning.png"
class="guides-image"
style="border: 1px solid #ebebeb"
/>

只需将此作为例外，然后继续申请。

#### mkcert

[mkcert](https://github.com/FiloSottile/mkcert) 是一个允许开发人员生成 SSL
证书及相关私钥的工具。 它还会创建一个证书颁发机构，使
本地设备信任生成的证书。 这里是
[安装指南](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation)。

比方说，您想创建一个只有您的设备知道的自定义域，
，仅用于开发目的。 让它类似于 `tma.internal`。 比方说，您想创建一个只有您的设备知道的自定义域，仅用于开发目的。 让它类似于 `tma.internal`。 为了让当前设备
知道哪个 IP 与该域相关联，我们应该修改
[hosts](https://en.wikipedia.org/wiki/Hosts_\(file\)) 文件，并将 `tma.internal` 映射到 `127.0.0.1`。

然后，运行指定该域的 mkcert 工具，就会收到两个文件：SSL
证书和私钥。  这两个文件都应在 Vite 配置中指定。

下面是使用 mkcert 生成的实体配置 Vite 开发服务器的示例：

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

export default defineConfig({
  server: {
    host: 'tma.internal',
    https: {
      cert: readFileSync(resolve('tma.internal.pem')),
      key: readFileSync(resolve('tma.internal-key.pem')),
    },
  },
});
```

### 网络

有时，开发人员需要在不同设备上打开应用程序。 我们在
Vite上使用
[host](https://vitejs.dev/config/server-options.html#server-host) 选项实现了这一功能。

让我们看看相应的配置是怎样的：

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
  },
});
```

或者，我们可以使用以下命令：`vite --host`.

启动开发服务器后，您会在控制台中看到类似的信息：

```bash
  VITE v5.2.12  ready in 15 ms

  ➜  Local:   http://localhost:5173
  ➜  Network: http://172.20.10.8:5173
  ➜  press h + enter to show help
```

现在，你可以在同一网络的设备上访问 "网络 "链接 (`http://172.20.10.8:5173`)。

要获取 HTTPS 链接，请参阅本指南的前几节。

### 远程

远程开发链接指的是一种临时链接，可用于访问
开发服务器，即使设备位于另一个网络中。

要创建这种类型的链接，首先需要启动本地开发服务器，并
获取可用于访问应用程序的 IP。  例如，
`127.0.0.1:5432`。 但是，该 IP 不允许其他网络上的设备访问
应用程序。

要解决这个问题，需要创建某种链接，作为连接本地 IP 的隧道。 为此，我们使用第三方有条件免费服务，如 [ngrok](https://ngrok.com/)
和 [localtunnel](https://localtunnel.github.io/www/)。

#### Ngrok

要开始使用 [ngrok](https://ngrok.com/)，您需要通过注册阶段
，然后进入
的 [设置页面](https://dashboard.ngrok.com/get-started/setup)。

接下来，您需要创建一条连接开发服务器的隧道。 每个用户至少有一个免费的静态
域名，可用于 BotFather。 要找到自己的网站，请使用
此 [链接](https://dashboard.ngrok.com/cloud-edge/domains)。

检索到静态域后，使用该命令创建隧道：

```bash
ngrok http --domain={YOUR_STATIC_DOMAIN} {YOU_DEV_SERVER_PORT}
```

因此，如果静态域是 `example.free.ngrok.app`，而您的开发服务器是在 `http://127.0.0.1:5432` 启动的
，则命令将是

```bash
ngrok http --domain=example.free.ngrok.app 5432
```

隧道建立后，打开 小程序的用户将被转发到您开发的
服务器。

#### Localtunnel

[Localtunnel](https://localtunnel.github.io/www/) 是一个完全免费的 ngrok 替代软件。  要使用 localtunnel 启动
，需要使用 npm 安装相应的软件包：

```bash
npm install -g localtunnel
```

然后，使用命令创建隧道：

```bash
lt -s mysubdomain --port 5432
```

软件包将返回以下 URL，可在 BotFather 中使用：

```
https://mysubdomain.loca.lt
```

## 用于生产

获得生产链接也并非难事。  为此，您可以使用流行的免费
静态服务：

- [GitHub Pages](https://pages.github.com/)
- [Heroku](https://www.heroku.com/)
- [Vercel](https://vercel.com/)

不过，开发人员也可以使用任何其他主机。 请务必记住，
应用程序的链接必须使用 HTTPS 协议，并具有有效的 SSL 证书。 要获取免费的
，请考虑使用 [certbot](https://certbot.eff.org/pages/about)。
