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
