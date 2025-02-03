---
outline:
  - 2
  - 3
---

# 托管

借助 Mate 快速可靠的托管服务，开发人员可以有效地管理其小程序的静态资产。 高效、安全地交付静态文件
对实现最佳性能至关重要。

通过使用内容分发网络（CDN），Mate 的托管服务提升了可靠性，并加速了各个区域用户的文件加载速度，超越了单服务器解决方案的性能。

托管服务是免费的，但在数据传输方面有一些限制。

> [!WARNING]
> 如果您目前使用单个服务器进行静态文件托管和
> 服务器端操作，过渡到 Mate 托管可能需要调整代码
> 。  如果您的应用程序已经区分了静态和动态
> 请求，那么集成工作就会简单得多。

### 重要建议：

在将单页应用程序 (SPA) 部署到静态托管平台（如 Mate’s hosting）时，选择不依赖服务器端配置的路由方法至关重要。

Hash-based routing (using the # symbol in URLs) is a simple and effective way to manage routes without needing server support. 许多框架提供内置解决方案或插件来实现这种类型的路由。

例如，如果使用 React，可以使用 HashRouter 替代 BrowserRouter：

```jsx
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
}

export default App;
```

## 特点

### 闪电般的速度

Mate托管的关键特性是其配置良好的内容分发网络，遍布于全球各地，在小程序常用的国家中都有覆盖。 这一功能可让开发人员专注于构建他们的
应用程序，而不必担心如何尽快交付静态资产
。

### 版本管理系统

另一个值得注意的托管功能是版本管理系统。

Mate 允许创建多达五个部署标签，使开发人员能够
部署带有特定标签的项目，而不会影响先前部署的
资产。

#### 使用示例

这里一个常见的使用场景是项目有两个版本：`latest` 和 `staging`。 开发人员可以使用 `latest` 版本进行生产，
而 `staging` 版本用于质量保证团队。

在部署 `staging` 资产后，QA 团队检查这个过渡状态是否可以接受。 然后，同样的资产可以使用 `latest` 标签进行部署，用于
生产。

#### 关于Base URL

部署静态资产时，Mate 使用以下Base URL 模式：

```
https://{storage_key}.tapps.global/{tag}
```

下面是一些关于这些参数的信息，以供参考：

- `storage_key`：已部署项目的唯一密钥。 该值为
  ，不可配置，并在创建项目时分配给项目。
- `tag`: 部署标签。 该值在部署过程中由
  开发人员设置。 示例包括`staging`、`latest`、`dev`等。

## 入门

### 步骤 1：注册项目

要开始使用托管功能，必须注册项目并
获取其部署令牌。 要获取令牌，请访问
到 [@tma_mate_bot](https://t.me/tma_mate_bot)，然后按 `Start` 按钮，
开始与机器人对话。

<p align="center">
  <img src="/mate/start.png" width="320"/>
</p>

然后，按下 `Create a Project` 按钮，并按照指定规则输入要创建的项目名称
。

<p align="center">
  <img src="/mate/create.png" width="320"/>
</p>

完成这一步后，机器人将返回创建的项目信息，包括
**deployment token**。

### 第 2 步：更新静态资产 Base URL

部署项目前，确保所有静态资产都有一个有效的 Base
URL。 您可以了解有关 Mate 如何生成静态资产 Base URL [此处](#about-base-url)的更多信息。

要使用特定标签检索项目部署信息，请使用
以下命令：

```bash
mate deploy info \
  --token {DEPLOYMENT_TOKEN} \
  --project {PROJECT_ID} \
  --tag {TAG}
```

这里，`DEPLOYMENT_TOKEN` 和 `PROJECT_ID` 值指的是从上一步收到的部署
标记和项目标识符。 `TAG` 是
部署版本标记名称。

输出示例

```
✔ Fetched deploy information for paper-planes (id 48) project
Project Title: paper-planes
Short title of the project
--------
Base Path (using tag "staging"): https://35f105bd6b.tapps.global/staging
This path will be used as a base path for the uploaded assets associated with this project. 
Consider using this value as a base path in your bundler. You can also use different tags using the --tag option.
--------
Allowed file extensions: html, css, js, cjs, mjs, png, jpg, jpeg, webp, ttf, woff, woff2, eot, json, ico
Files extensions that are allowed to be uploaded.
--------
Maximum size: 10485760 bytes
Maximum upload size.
--------
Maximum files count: 100
Maximum number of files a single upload can contain.
```

`https://35f105bd6b.tapps.global/staging` 是项目捆绑程序应
使用的 Base URL。

下面介绍如何使用 [Vite](https://vitejs.dev)。

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  base: 'https://35f105bd6b.tapps.global/staging'
});
```

### 步骤 3：部署项目

要部署项目，Mate 需要指定一个要上传到
托管服务的文件夹。 该文件夹必须只包含
用户浏览器可以打开的文件，因此
目录中不应有源文件或用于不同目的的文件。

假设条件如下

- 已创建 ID 为 `48` 和令牌为 `aabbccdd` 的项目。
- 名为 `dist` 的文件夹包含小程序构建的所有静态资产。
- 部署静态资产时需要使用标签 `latest`。

要在这些条件下部署项目，请运行以下命令：

```bash
mate deploy upload \
  --dir dist \
  --token aabbccdd \
  --project 48 \
  --tag latest
```

以下是可能的输出结果：

```
✔ Fetched deploy information for paper-planes (id 48) project
i Assets base path (using tag "latest"): 
https://35f105bd6b.tapps.global/latest
i Allowed file extensions: html, css, js, cjs, mjs, png, jpg, jpeg, webp, ttf, woff, woff2, eot, json, ico
i Maximum upload size: 10485760 bytes
i Maximum files count: 100
✔ Directory compressed successfully from 24185 to 7168 bytes
✔ Archive uploaded successfully
📁 dist
╰ 📄 index.js (https://35f105bd6b.tapps.global/latest/index.js)
```

> [!WARNING]
> 部署的目录必须只包括标准文件和目录，
> 不包括私有文件和目录（以`.`符号开头）。 禁止所有其他类型的
> 文件（如符号链接）。 如果在部署过程中发现，
> CLI 工具将抛出相应的错误。

### Step 4: 验证部署并配置 Telegram 小程序

在部署之后，建议通过直接访问链接来验证应用是否正常工作。可以按照以下步骤进行验证：

```
https://{storage_key}.tapps.global/{tag}/index.html
```

如果一切正常运行，使用此链接作为创建 Telegram 小程序时的 web 应用 URL。以下是步骤：

**例如:**

如果你的 storage_key 是 35f105bd6b，并且标签是 latest，那么链接应该类似于：

```
https://35f105bd6b.tapps.global/latest/index.html
```

确保在访问该链接时，你的应用能够正确加载并且没有出现错误。你可以按照以下步骤进行检查. 这样可以确保你的 Telegram 小程序与托管设置兼容并且正常工作。

## 使用配置

为避免重复指定参数，Mate 允许创建包含所有参数的特殊配置。

要开始使用 Mate 配置和可选命令选项，请在项目根目录下创建包含以下示例内容的 `mate.yml` 或 `mate.json` 文件：

:::code-group

```yml [mate.yml]
deploy:
  projectId: 48
  directory: dist
  token: aabbccdd
  tag: latest
```

```json [mate.json]
{
  "deploy": {
    "projectId": 48,
    "directory": "dist",
    "token": "aabbccdd",
    "tag": "latest"
  }
}
```

:::

然后，`info` 和 `upload` 命令将从配置中获取值。

```bash
# Both of these commands will use the following 
# options from the Mate config:
# --project = 48
# --dir "dist"
# --token "aabbccdd"
# --tag "latest"
mate deploy info
mate deploy upload
```

如果需要覆盖任何参数，应在命令中指定。
如果需要覆盖任何参数，应在命令中指定。
例如，若要用 `staging` 值覆盖 `tag` 选项，请使用
以下命令：

```bash
mate deploy info --tag staging
```
