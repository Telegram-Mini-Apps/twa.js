# 自定义启动参数 {#Start Parameter}

起始参数是从外部环境传递给 小程序的自定义字符串参数。
自定义启动参数是从外部环境传递给 小程序的自定义字符串参数。
其值存储在 [tgWebAppStartParam](launch-parameters#tgwebappstartparam) 启动
参数中。

该参数包含在下列情况之一中：

- 机器人链接包含 `startattach` 查询参数。

```
https://t.me/botusername?startattach=ABC
```

- 直接链接包含 `startapp` 查询参数。

```
https://t.me/botusername/appname?startapp=ABC
```

[//]: #C "TODO: Direct Link: refer to the direct links page"

在上述两种情况下，起始参数都将设置为 `ABC`。

::: info

自定义启动参数不包含在位置哈希值中。  相反，它可以在 URL
查询参数中找到。

:::

:::tip

该参数的值会在初始数据的 [start_param](init-data.md#parameters-list) 属性中重复。

:::

## 限制条件

- 最大长度：**512 个符号**
- 允许使用的符号：**拉丁字母符号、数字** 和 **下划线**。 值的有效 regexp 是 `/[\w]{0,512}/`。
