# 微信小程序架构实现

使用web技术模式实现微信小程序双线程架构:

- 使用浏览器线程模拟 Native 
- 使用 iframe 模拟实现 ui 渲染线程
- 使用 web worker 模拟实现逻辑线程

Native 层:
- 负责小程序生命周期管理
- 负责UI线程和逻辑线程的通信

- 一个小程序共用一个逻辑线程 jscore
- 一个UI线程对应一个 webview
- webview 负责渲染页面, 并且通过 jsbridge 与逻辑线程通信

开发小程序完成后，通过compile 编译器对项目进行编译，生成两份代码:
- logic.js 逻辑线程代码
- view.js UI线程代码

逻辑线程代码会被放到逻辑线程中执行，UI线程代码会被放到 UI 线程中执行。

components 包中实现了常见的一些小程序组件；

### 项目启动

- 1. 启动native
```
npm run start
```

- 2. 启动逻辑线程
```
cd packages/logic
npm run start
```

- 3. 启动UI线程
```
cd packages/ui
npm run start
```

- 4. 启动小程序组件包
```
cd packages/components
npm run start
```

### 小程序开发
在 miniapp 目录下存放了两个小程序项目

开发完成小程序之后，需要通过小程序编译指令进行项目编译:
```
mini-compile build [outputDir]
```

> 在运行这个命令前，需要进入到 packages/compile 包中，将编译包link到本地

在 src/service 中，mock 了三个固定的小程序信息，通过名称作为小程序appId进行索引
