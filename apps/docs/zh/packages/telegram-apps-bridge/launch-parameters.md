# 启动参数

启动参数对小型应用程序的生命周期至关重要。  要了解有关启动参数及其重要性的更多信息，值得阅读 [这篇](../../platform/launch-parameters.md) 文章。

该软件包允许开发人员使用
的 `retrieveLaunchParams` 函数从当前环境中提取启动参数。  它会尝试从所有可能的来源检索它们，如果
失败，就会抛出一个错误。

```typescript
import { retrieveLaunchParams } from '@telegram-apps/bridge';

const launchParams = retrieveLaunchParams();
```
