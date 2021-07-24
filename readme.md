# graphQL 学习

## 简述 Graphql （结合Express ）是如何使用的？

### 服务端

1. 安装 npm 包 graphql, 使用其中导出的 buildSchema, 传入 graphQL 字符串构建用于查询的 schema
2. 定义上一步 schema 的 resolve, 用于获取返回值
3. 引入第三方模块 express-graphql, 取出其导出的成员 graphqlHTTP
4. 调用 graphqlHTTP, 传入前两步得到的 schema 和 resolver, 生成一个中间件(另一个参数 `graphiql: true` 增加个供查询数据使用的 graphQL 页页面)
5. 挂载此中间件到一个地址, 如 `/graphql`
6. 启动服务, 此时 `http://localhost:port/graphql` 即可访问查询页面

### 客户端

- 发送 POST 方法的请求, url 是服务端挂载 graphQL 中间件的地址
- 请求体是一个 json 对象, 有一个属性名为 query, 值是 graphql 字符串
- 返回的报文中包含一个对象, 有个属性名为 data, 值为查询出的所有字段值
- graphql 查询字符串中不可以查询未定义过的字段, 否则报错

## 简述 Apollo server 的基本使用

### 单独使用

1. 使用 apollo-server 提供的 gql 函数定义 schema
2. 定义 resolver
3. 创建 apollo-server 实例, 传入 schema 和 resolver, 启动

### 结合 express 使用

1. 安装 apollo-server-express 和 express
2. 创建 express 实例
3. 创建 apollo-server 实例
4. 将 apollo-server 实例挂载到 express 实例上
5. 启动 express 实例

注意:

- resolver 中的传参包括四个: parent, args, context, info
- 通过 resolver 解析链对查询步骤(多个字段)进行拆分, 避免无用查询语句的执行(只取要查询的字段)

## 从 MongoDB 中获取数据的流程

### 简单(resolver和db操作紧耦合)

1. 创建对应数据库的数据模型
2. 创建 graphql 查询语句和 resolver, 在 resolver 的方法中调用上一步的数据模型的查询方法, 返回查询结果
3. 连接数据库

### 复杂(解耦resolver和db)

1. 安装 apollo-datasource-mongodb 模块, 创建并导出数据源类
2. 创建对应数据库的数据模型
3. 在数据源实例中定义各种存取数据的方法, 这些方法内部调用模型的数据库方法
4. 初始化 ApolloServer 时将数据源类传入
5. 在 resolver 中通过第三个参数获取到数据源实例
6. 调用数据源实例的查询方法, 返回数据

## 实现一个 GraphQL 版本的完整 realworld API

building...

### 接口列表

[参见此处](https://github.com/gothinkster/realworld/tree/master/api)

|               功能             |      Method      |        path                        |
|--------------------------------|------------------|------------------------------------|
|  Authentication                |  POST            |  /api/users/login                  |
|  Registration                  |  POST            |  /api/users                        |
|  Get Current User              |  GET             |  /api/user                         |
|  Update User                   |  PUT             |  /api/user                         |
|  Get Profile                   |  GET             |  /api/profiles/:username            |
|  Follow user                   |  POST            |  /api/profiles/:username/follow     |
|  Unfollow user                 |  DELETE          |  /api/profiles/:username/follow     |
|  List Articles                 |  GET             |  /api/articles                      |
|  Feed Articles                 |  GET             |  /api/articles/feed                 |
|  Get Article                   |  GET             |  /api/articles/:slug                |
|  Create Article                |  POST            |  /api/articles                      |
|  Update Article                |  PUT             |  /api/articles/:slug                |
|  Delete Article                |  DELETE          |  /api/articles/:slug                |
|  Add Comments to an Article    |  POST            |  /api/articles/:slug/comments       |
|  Get Comments from an Article  |  GET             |  /api/articles/:slug/comments       |
|  Delete Comment                |  DELETE          |  /api/articles/:slug/comments/:id   |
|  Favorite Article              |  POST            |  /api/articles/:slug/favorite       |
|  Unfavorite Article            |  DELETE          |  /api/articles/:slug/favorite       |
|  Get Tags                      |  GET             |  /api/tags                         |

## 开发中遇到的问题

### mac 安装 mongodb

多年前安装过 mongodb, 感觉版本应该比较久了, 就把 mongodb 卸载了重装.

根据官网上的指导:

第一步:

```bash
xcode-select --install
```

因为 mac 上有 xcode, 就没执行第一步

第二步:

```bash
brew tap mongodb/brew
```

成功执行, 没有报错

第三部:

```bash
brew install mongodb-community@5.0
```

报错如下:

```bash
Error: No similarly named formulae found.
Error: No available formula with the name "mongosh" (dependency of mongodb/brew/mongodb-community).
It was migrated from mongodb/brew to homebrew/core.
```

找到[stack overflow 上的这个帖子](https://stackoverflow.com/questions/67953848/no-similarly-named-formulae-found-when-trying-to-install-mongodb-on-macos)

据帖子说是 mongosh 没安装, 需要先安装 mongosh:

```bash
brew install mongosh
```

安装完, 再回去安装 mongodb. 又报错. 报错信息忘了, 是xcode相关的 command line tool 版本旧了

回去第一步执行

```bash
xcode-select --install
```

又得到报错信息

```bash
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```

根据报错信息, 执行 `Software Update`, 发现根本没有这个命令

然后有找到[这个帖子](https://stackoverflow.com/questions/34617452/how-to-update-xcode-from-command-line)

```bash
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

整个卸了重装, 过程用了十几分钟, 装好了. 此时再回去执行安装 mongodb 的第三步

```bash
brew install mongodb-community@5.0
```

安装成功

### 启动 mongodb

虽然 mongodb 官网说其默认数据存储路径是 /data/db, 但是我目前的 mac 版本已经无法在根目录下新建文件夹

可以看[这篇帖子](https://stackoverflow.com/questions/58034955/read-only-file-system-when-attempting-mkdir-data-db-on-mac)

所以只能在其他地方新建一个用于存放数据库文件的目录.

### makeExecutableSchema

makeExecutableSchema 移动到了 @graphql-tools/schema 这个包中

### graphql 页面的问题

教程里将的应该是 Apollo Server (v2), 我现在用的 Apollo Server (v3)启动起来后, graphql页面会跳转到一个第三方的沙箱页面, 然后这个沙箱页再访问本地的 graphql 服务

看了[这个文章](https://www.apollographql.com/docs/apollo-server/testing/build-run-queries/#graphql-playground), 在 apollo server 的创建参数里添加了一个plugin, 就可以本地起查询页面了

```javascript
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const server = new ApolloServer({
  schema,
  dataSources,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});
```

### graphql 页面报错

一开始, 沙箱页面报错

```text
Network error: unable to reach server

We could not introspect your schema. Please enable introspection on your server.
```

我还以为是它访问不到我的电脑, 后来用上面的方法起本地 graphql 页面也报错

```text
"error": "Response not successful: Received status code 500"
```

从本地页面的报错信息来看, 似乎是服务器内部错误. 但是 cmd 里并没有报错. 打开 network 面板看了一下请求的响应, 找到了:

```json
{
  "errors": [{
    "message": "config.dataSources is not a function",
    "extensions": {
      "code": "INTERNAL_SERVER_ERROR",
      "exception": {
        "stacktrace": ["TypeError: config.dataSources is not a function", "    at initializeDataSources (/Users/baoquanyu/Documents/code/graph-rw/node_modules/apollo-server-core/dist/requestPipeline.js:281:40)", "    at Object.processGraphQLRequest (/Users/baoquanyu/Documents/code/graph-rw/node_modules/apollo-server-core/dist/requestPipeline.js:25:11)", "    at processTicksAndRejections (internal/process/task_queues.js:93:5)", "    at async processHTTPRequest (/Users/baoquanyu/Documents/code/graph-rw/node_modules/apollo-server-core/dist/runHttpQuery.js:179:30)"]
      }
    }
  }]
}
```

原来是导出的 dataSources 需要是一个返回对象的函数(听课不仔细-_-!). 改好之后, 报错没了, 页面能正常使用了.
