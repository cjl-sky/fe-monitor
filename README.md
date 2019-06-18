# fe-Monitor

## 介绍

fe-monitor 为前端团队的轻量级的 Node.js 项目内核性能监控 + 分析工具

## 安装

全局安装即可

```bash
npm install git+ssh://git@github.com:cjl-sky/fe-monitor.git --save
```

## 使用

在你的项目入口文件中按照如下方式引入，当然请传入你的项目名称：

```js
const feMonitor = require('fe-monitor');
feMonitor('你的项目名称');
```

打开你的浏览器，访问 http://localhost:12333 ，即可看到进程界面。

### - 完整样例 & Demo

```js
'use strict';
const monitor = require('fe-monitor');

// 设置应用监控页面
const setMonitor = (projectName, appName) => {
  monitor({
    project_name: `${projectName}/${projectName}-${appName}`,
    log_level: 0,
    http: {
      prefix: '/monitor',
    },
    auth: {
      need: true,
      /**
       @param {string} user 用户名
       @param {string} pass 用户键入密码
       @return {promise}
       **/
      authentication(user, pass) {
        return new Promise(resolve => {
          if (user === 'admin' && pass === '123456') resolve(true);
          else resolve(false);
        });
      },
    },
  });
};

const express = require('express');
const app = express();

app.get('/hello', function(req, res, next) {
  res.send('hello');
});

app.listen(8082);
```

将上述的内容保存成一个 js 文件，启动后访问 http://127.0.0.1:12333 即进入 Fe-Monitor 的首页，就是这样的简单！

### - 兼容性

目前经过测试，兼容以下 Node.js 版本：

- Node v4.x
- Node v6.x
- Node v8.x
- Node v10.x

## V. 单元 & 覆盖率测试

git clone 下本项目并且安装完毕 dependence 依赖后，执行如下命令进行单元测试:

```bash
npm run test
```

也可以执行如下命令查看单元测试覆盖率:

```bash
npm run cov
```

如果执行了覆盖率测试，使用浏览器打开 **coverage/lcov-report/index.html** 文件，则可以看到详细的覆盖率信息。

## 注意事项

- 迭代时要维护好 unit test
- 提交代码后要注意 CI 平台、邮件是否有单测失败反馈 (暂时不考虑配置到 CI)
