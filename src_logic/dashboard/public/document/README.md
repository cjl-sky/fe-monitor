# **I. 简介**

轻量级的 Node.js 项目内核性能监控 + 分析工具，在默认模式下，只需要在项目入口文件 `require` 一次，无需改动任何业务代码即可开启内核级别的性能监控分析。

### - 功能特点

- 服务器状态概览信息展示
- 实时 CPU 函数性能分析，帮助定位程序的性能瓶颈点
- 实时 Memory 堆内内存结构分析，帮助定位到内存疑似泄漏点

Fe-monitor 前端团队提高 Node 项目进程，以便性能优化时能更有针对性。

### - 兼容性

目前经过测试，兼容以下 Node.js 版本：

- Node v4.x
- Node v6.x
- Node v8.x
- Node v10.x

### - 2.0 新特性

- 基于 vue.js 和 iview 组件全新设计的 UI
- 全面兼容 v4.x ~ v8.x
- 新增概览 Overview 展示页
- 支持动态更新配置，无需重启一键生效
- 支持 Stream 流式解析更大的 HeapSnapshot
- 支持 Cluster 集群部署，支持定制私有通信

## **II. 快速开始**

### - 安装模块

执行如下命令安装 fe-monitor：

```js
npm install git+ssh://git@github.com:cjl-sky/fe-monitor.git --save
```

### - 项目中引入

在你的项目入口文件中按照如下方式引入，当然请传入你的项目名称：

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor('你的项目名称');
```

好了，此时你所需要做的一切都已就绪，接下来以你喜欢的方式运行项目即可，不管是 `nohup` 还是 `pm2`，亦或是直接 `node` 启动均可。

### - 访问监控页面

打开你的浏览器，访问 http://localhost:12333 ，即可看到进程界面。

### - 完整样例 & Demo

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor('Mercury');
const express = require('express');
const app = express();

app.get('/hello', function(req, res, next) {
  res.send('hello');
});

app.listen(8082);
```

将上述的内容保存成一个 js 文件，启动后访问 http://127.0.0.1:12333 即进入 Fe-monitor 的首页，就是这样的简单！

## **III. 定制化**

考虑到各个公司或者个人使用和部署场景千变万化，所以 Fe-monitor 前端团队保留了高度定制化的能力，用以适配合适的场景。

在定制化模式下依靠给 Fe-monitor 启动进程传入一个对象参数，来开启不同的功能，下面将详细介绍开发者可定制化的部分。

### - 重要名词

Fe-monitor 2.x 版本下有几个名词比较重要，这里需要解释一下，以方便开发者对下面不同定制化文档的理解。

#### 1. dashboard

`dashboard` 即访问 `http://127.0.0.1:12333` 看到的监控页面，在源码中对应的为 `src_logic/dashboard` 部分，作用是 **启动监控展示页面的 http 服务器**，以及 **启动接收客户端连接的通信服务器** 。

#### 2. embrace

`embrace` 即嵌入业务进程的客户端部分，在源码中对应的为 `src_logic/embrace` 部分，作用是 **建立通信链接，和 dashboard 中的通信服务器进行信令交互** 。

### - Cluser 模式

对于开发者来说，很多情况下有许多个 Node.js 项目需要纳入监控，并且这些项目可能是部署在不同机器实例上的，这时候采用 [快速开始](#ii-快速开始) 的默认部署方式会比较繁琐：即每次查看不同项目的 dashboard 界面，都需要手动输入该项目所在的服务器的地址才能进行。

对于这种 dashboard(server) 部署到一个集群中，而 embrace(client) 嵌入业务进程后集中向这个 dashboard 集群建立长连接的 C/S 部署模式需求，fe-monitor 1.x 版本支持的不是特别好，所以在 2.0 下重新设计了一番。

#### 1. dashboard 单点

基础部署方式，即 `dashboard` 进程只部署一个。因为只有一个进程，因此无需任何第三方存储做不同节点的数据同步和共享，好处是没有额外依赖。下面是详细部署方式：

一. `dashboard` 单点样例:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  cluster: true,
  bootstrap: 'dashboard',
  /**
     @description 以下 dashboard 参数可选，具体见下面的参数说明
     **/
  /*dashboard: {
    	port_http: 20000,
		port_tcp: 30000
    }*/
});
```

上面是启动 dashboard 进程需要的所有代码，传入对象的入参说明如下：

|   参数    |  类型   |                   值                   |                                           说明                                            |
| :-------: | :-----: | :------------------------------------: | :---------------------------------------------------------------------------------------: |
|  cluster  | Boolean |          `true` 或者 `false`           |                    必选参数，是否开启 cluster 模式，这里必须为 `true`                     |
| bootstrap | String  |       `dashboard` 或者 `embrace`       |                      必选参数，当前启动类型，这里必须为 `dashboard`                       |
| dashboard | Object  | port*http:\_Number* port*tcp:\_Number* | 可选参数，http 默认端口为 `12333`，tcp 默认端口为 `26666`，视自己的服务器端口开启情况修改 |

`port_http` 和 `port_tcp` 的额外说明：

- **port_http:** dashboard 中启动的提供监控页面的 http 服务器端口
- **port_tcp:** dashboard 中启动的负责和客户端进行信令交互的 tcp 服务器端口

二. 嵌入业务进程的 `embrace` 部分单点样例:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  cluster: true,
  bootstrap: 'embrace',
  project_name: 'Buycoor',
  /**
     @param {string} tcp_host 填写你部署的 dashboard 进程所在的服务器 ip
     @param {number} tcp_port 填写你部署的 dashboard 进程所在的服务器 端口
     **/
  embrace: {
    tcp_host: '127.0.0.1',
    tcp_port: 30000,
  },
});

//其余自己项目代码
```

传入对象的入参说明如下：

|     参数     |  类型   |                  值                   |                                                      说明                                                       |
| :----------: | :-----: | :-----------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
|   cluster    | Boolean |          `true` 或者 `false`          |                               必选参数，是否开启 cluster 模式，这里必须为 `true`                                |
|  bootstrap   | String  |      `dashboard` 或者 `embrace`       |                                  必选参数，当前启动类型，这里必须为 `embrace`                                   |
| project_name | String  |               不固定值                |                                   必选参数，项目名称，默认是 `process.title`                                    |
|   embrace    | Object  | tcp*host:\_String* tcp*port:\_Number* | 必选参数，dashboard 部署所在服务器的 ip 及其启动的 tcp-server 端口号，ip 默认为 `127.0.0.1`，端口默认为 `26666` |

!> `embrace` 传入的参数中的 embrace 节点中的 tcp_host 和 tcp_port 组装起来的 url 应当就能访问到 `dashboard` 中启动的负责和客户端进行信令交互的 tcp 服务器。

#### 2. dashboard 集群

dashboard 集群，既可能将 dashboard 以多进程的方式部署到服务器上，也可能是部署到多个服务器上，不管哪一种方式，必然面临不同 dashboard 进程间的数据共享问题，所以这里引入了 `redis` 作为不同的 dashboard 进程间的共享数据模块。

因此，集群相比单点，仅仅需要多传入一个 `storage` 参数，如下：

一. `dashboard` 集群样例:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  cluster: true,
  bootstrap: 'dashboard',
  /**
     @description 集群下传入参数的 storage 节点必须存在
     **/
  storage: {
    type: 'redis',

    redis: {
      host: '127.0.0.1',
      port: 6379,
    },

    init: function(config, logger, utils) {
      const Redis = require('ioredis');
      const redisAddr = config.storage.redis;
      const redis = new Redis(redisAddr.port, redisAddr.host);
      //增加 pub / sub 消息队列
      const subscribe = new Redis(redisAddr.port, redisAddr.host);
      const publish = new Redis(redisAddr.port, redisAddr.host);
      return {
        sub: subscribe,
        pub: publish,
        setP: redis.set.bind(redis),
        getP: redis.get.bind(redis),
        delP: redis.del.bind(redis),
      };
    },
  },
  /**
     @description 以下 dashboard 参数可选，具体见下面的参数说明
    **/
  /*dashboard: {
    	port_http: 20000,
		port_tcp: 30000
    },*/
});
```

传入对象增加的 `storage` 节点的参数说明:

| 参数  |   类型   |             值              |                                                                                           说明                                                                                           |
| :---: | :------: | :-------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| type  |  String  |           `redis`           |                                                         必选参数，共享存储类型，暂时仅支持 `redis`，以后视情况开放更多的存储方式                                                         |
| redis |  Object  | host:_String_ port:_Number_ |                                                                 必选参数，填写可用的 redis 服务器 `地址` 和 `端口` 信息                                                                  |
| init  | Function |       return:_Object_       | 必选参数，初始化 redis 客户端，需要返回 `setP`, `getP`, `delP` 三个对应 redis 中设置、获取、删除的 Promise 方法，以及专门用于 `subscribe` 和 `publish` 的 redis 句柄，格式如上述样例所示 |

!> 这里在 init 方法中选用了 `ioredis` 作为客户端，也可以选择别的 redis 客户端实现，只要返回的对象包含样例中的方法即可。

二. 嵌入业务进程的 `embrace` 部分集群样例和单点样例完全一致。

#### 3. 定制私有通信

以上两种部署方式应该可以解决绝大多数问题了，但是还是会有一些极端情况：部署 dashboard 的时候发现公司不支持 tcp 转发。

虽然这样的情况非常少，但是 2.0 版本的 fe-monitor 也实现了允许开发者注入定制化的私有通信方案来替换默认 dashboard 和 embrace 进程间的 tcp 通信方式，下面就是定制私有通信方案的样例，采用绝大多数场景都支持的 `http + 长轮询` 的方式实现：

一. `dashboard` 定制私有通信服务器样例:

在传入的参数对象中增加 `private` 节点，创建私有通信服务器，同时在 `dashboard` 节点中增加 `port_private` 来注明私有通信服务器监听的端口号，完整样例如下所示：

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  cluster: true,
  bootstrap: 'dashboard',
  /**
     @description 增加 private 节点
     **/
  private: {
    polling_time: 60 * 1000,

    send_key: 'IS_SENDED',

    send(msg, res) {
      //取出公共部分
      const config = this.config;
      const common = this.common;
      const dbl = this.dbl;
      const cacheUtils = common.cache;

      //已经使用过的 res 句柄，放弃返回
      if (res[config.private.send_key]) return Promise.resolve('The socket has sended!');

      msg = (typeof msg === 'object' && JSON.stringify(msg)) || msg;
      res.send(msg);
      return Promise.resolve('success');
    },

    server: function() {
      //取出公共部分
      const config = this.config;
      const common = this.common;
      const dbl = this.dbl;
      const cacheUtils = common.cache;
      const controller = this.controller || {};

      //构造 http 服务器
      const express = require('express');
      const app = express();
      const bodyParser = require('body-parser');

      //加载中间件
      app.use(bodyParser.json({ limit: '50mb' }));
      app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

      //设置简易路由
      app.post('/', (req, res, next) => {
        let data = req.body.data;
        dbl.debug(`private_server receive data: ${data}`);
        data = common.utils.jsonParse(data);

        res.on('close', () => {
          dbl.debug(`private_client closed, info is: ${res.__key__}`);
          cacheUtils.storage.delP(res.__key__, config.cache.socket_list);
          cacheUtils.storage.delP(res.__key__, config.cache.socket_list, true);
        });

        res.on('finish', () => {
          dbl.debug(`private_client finish, info is: ${res.__key__}`);
          //cacheUtils.storage.delP(res.__key__, config.cache.socket_list);
        });

        if (controller[data.msgType]) {
          const fn = controller[data.msgType];
          const returnMsg = (typeof fn === 'function' && fn(res, data.data)) || false;
          //对心跳包进行特殊处理
          if (Number(data.id) === 0) {
            const pollingTimer = setTimeout(_sendResponse, config.private.polling_time, returnMsg);
            return;
          }
          //其余请求立即返回
          _sendResponse(returnMsg);

          function _sendResponse(returnMsg) {
            //已经使用过的 res 句柄，放弃返回
            if (res[config.private.send_key]) return;

            //如果 controller 返回的值是 promise，则调用 then 后再返回
            if (common.utils.isPromise(returnMsg)) {
              returnMsg.then(r => res.send(JSON.stringify(r)));
              return;
            }
            //普通对象或者字符串直接调用返回数据方法将处理数据返回给请求方
            if (returnMsg) {
              res.send(JSON.stringify(returnMsg));
            }
          }
        }
      });

      return app;
    },
  },
  /**
     @param {Number} port_private 填写私有通信服务器监听端口号
     **/
  dashboard: {
    port_private: 20000,
  },
});
```

传入对象增加的 `private` 节点的参数说明:

|     参数     |   类型   |             值              |                                                                     说明                                                                     |
| :----------: | :------: | :-------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
|     send     | Function |      return:_Promise_       | 必选参数，服务器向客户端发送消息方法，这里将服务器需要推送给客户端的消息塞入 http 响应体中，借助 `长轮询` 的形式实现了 http 协议下的服务器推 |
|    server    | Function | return:_Http-Server-Handle_ |                                          必选参数，建立私有通信服务器方法，返回创建的 `服务器句柄`                                           |
| polling_time |  Number  |           不固定            |                        可选参数，长轮询的时间间隔，这个参数不是 private 节点必须的，而是 `server` 函数中使用到的配置                         |
|   send_key   |  String  |           不固定            |              可选参数，判断客户端发送的 http 请求是否已经返回，这个参数不是 private 节点必须的，而是 `send` 函数中使用到的配置               |

二. 嵌入业务进程的 `embrace` 部分定制私有通信客户端样例:

在传入的参数对象中增加 `private` 节点，创建私有通信客户端，同时在 `embrace` 节点中增加 `url_private` 来注明连接到上一步中搭建的私有通信服务器的地址，完整样例如下所示：

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  cluster: true,
  bootstrap: 'embrace',
  project_name: 'Buycoor',
  /**
     @description 增加 private 节点
     **/
  private: {
    send(msg) {
      const request = require('request');

      //取出公共部分
      const config = this.config;
      const common = this.common;
      const dbl = this.dbl;

      msg = (typeof msg === 'object' && JSON.stringify(msg)) || msg;

      return new Promise((resolve, reject) => {
        request.post(
          {
            url: `${config.embrace.url_private}`,
            form: { data: msg },
          },
          function(err, res, data) {
            if (err) {
              dbl.error(`private->send error: ${err}`);
              return reject(err);
            }
            dbl.debug(`private->send statusCode: ${res.statusCode} receive data: ${data}`);
            resolve('success');
          }
        );
      });
    },

    client: function() {
      //取出公共部分
      const config = this.config;
      const common = this.common;
      const dbl = this.dbl;
      const controller = this.controller;

      //构造 http 客户端
      const request = require('request');
      const utils = common.utils;
      const socketUtils = common.socket;

      //定义心跳包
      const heartBeatMessage = socketUtils.composeMessage('req', 0, {
        pid: `${config.project_name}${config.process_seg}${config.embrace.machine_unique_key}${config.process_seg}${
          process.pid
        }`,
      });

      //首次发送心跳包
      _send(heartBeatMessage);

      function _send(msg) {
        msg = (typeof msg === 'object' && JSON.stringify(msg)) || msg;
        request.post(
          {
            url: `${config.embrace.url_private}`,
            form: { data: msg },
          },
          function(err, res, data) {
            if (err || (res && Number(res.statusCode !== 200))) {
              //如果链接有错误，则 1s 后再次发送心跳包
              dbl.error(`send msg: ${msg} error: ${err}`);
              return setTimeout(_send, config.reconnect_time, msg);
            }
            dbl.debug(`private->_send msg: ${msg} statusCode: ${res.statusCode} receive data: ${data}`);
            data = utils.jsonParse(data);

            //这表示响应，偶数是请求，仅有请求或者心跳响应才重新发送心跳包
            if ((data.id && data.id % 2 === 0) || Number(data.id) === 1) {
              //立即返回一个心跳包请求给服务器
              _send(heartBeatMessage);
            }

            //处理真正的请求
            if (controller[data.msgType]) {
              const fn = controller[data.msgType];
              const returnMsg = (typeof fn === 'function' && fn(res, data.data)) || false;
              //如果 controller 返回的值是 promise，则调用 then 后再返回
              if (common.utils.isPromise(returnMsg)) {
                returnMsg.then(r => _send(JSON.stringify(r)));
                return;
              }
              //普通对象或者字符串直接调用返回数据方法将处理数据返回给请求方
              if (returnMsg) {
                _send(JSON.stringify(returnMsg));
              }
            }
          }
        );
      }
    },
  },
  /**
     @param {String} url_private 填写搭建的私有通信服务器地址
     **/
  embrace: {
    url_private: 'http://127.0.0.1:20000',
  },
});

//其余自己项目代码
```

传入对象增加的 `private` 节点的参数说明:

|  参数  |   类型   |        值        |                                                 说明                                                  |
| :----: | :------: | :--------------: | :---------------------------------------------------------------------------------------------------: |
|  send  | Function | return:_Promise_ |                          必选参数，客户端向私有通信服务器 `发送消息` 的方法                           |
| client | Function |        -         | 必选参数，客户端向私有通信服务器 `建立心跳包` ，以及处理私有通信服务器带在心跳包响应体中的 `推送消息` |

!> 定制私有通信的部署方式，同样仅在 `cluster: true` 下生效，支持单点和集群，上述例子是单点，集群方式在 `dashboard` 进程启动入参中加入 `storage` 节点即可，`embrace` 进程启动参数无需更改。

### - 自定义过滤

在 `CPU Profiling` 函数栈性能分析中，原始结果经常包含大量 Node 源代码中的函数，或者 node_modules 中的函数，这样容易干扰我们寻找自己代码中的性能瓶颈点函数。

所以 fe-monitor 提供了过滤结果的方法，也允许开发者根据需求自行注入过滤函数，默认的过滤方法会过滤掉包含 node_modules、anonymous 以及路径中不以 "/" 开头的系统函数，下面是内置默认的过滤函数:

```js
/**
 * @param {string} filePath 文件路径
 * @param {string} funcName 函数名
 * @description 过滤无关函数
 */
function filter_function(filePath, funcName) {
  //过滤掉包含 node_modules 和 anonymous 的函数
  const needIgnore = ['node_modules', 'anonymous'].some(fileName => {
    return Boolean(~filePath.indexOf(fileName)) || Boolean(~funcName.indexOf(fileName));
  });

  //结构路径中必须以 "(/" 开头
  const mustHave = [/^\(\/.*/].every(regexp => {
    return Boolean(regexp.test(filePath));
  });

  return !needIgnore && mustHave;
}
```

这个函数可以根据项目需求进行更改，入参 `filePath` 和 `funcName` 的说明见上面注释，编写完过滤函数后，按照如下方式传入 fe-monitor 即可生效。

下面是针对 [快速开始](#ii-快速开始) 中提供的默认部署模式下和 [定制化](#iii-定制化) 中提供的 cluster 模式下传入自定义过滤函数的说明：

#### 1. 默认模式过滤

默认模式下只需要将 `filter_function` 参数带入 `profiler` 节点即可，样例如下:

```js
'use strict';
const femonitor = require('fe-monitor');

femonitor({
  project_name: 'buycoor',
  /**
	 @description filter_function 位于入参的 profiler 节点中
	 **/
  profiler: {
    filter_function: filter_function,
  },
});
```

#### 2. cluster 模式过滤

cluster 模式下只需要将 `filter_function` 参数带进 `embrace` 进程即可， `dashboard` 进程无需改动，样例如下:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  cluster: true,
  bootstrap: 'embrace',
  project_name: 'buycoor',
  embrace: {
    tcp_host: '127.0.0.1',
    tcp_port: 30000,
  },
  /**
	 @description filter_function 位于入参的 profiler 节点中
	 **/
  profiler: {
    filter_function: filter_function,
  },
});

//其余自己项目代码
```

### - 权限模块

fe-monitor 对项目进行的是实时分析，很多情况下我们不希望无关人员开启相关功能，所以项目也提供了鉴权模块，实现如下两种鉴权方式：

- **仅对登录 dashboard 鉴权**，即登录成功后可以对列表所有项目进行内核分析操作。登录不成功则无法进入 dashboard 页面。
- **登录 dashboard 鉴权，并且对登录成功的用户和列表项目间也进行鉴权**，即非开发者设定的 admin 用户则只能对允许操作的项目进行内核分析操作。

下面是对两种鉴权方式使用的分别介绍:

#### 1. 登录鉴权

通过在传入 fe-monitor 的启动参数中增加 `auth` 节点，来开启鉴权功能，样例如下所示：

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  project_name: 'buycoor',
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
```

传入对象增加的 `auth` 节点的参数说明:

|      参数      |   类型   |         值          |                         说明                         |
| :------------: | :------: | :-----------------: | :--------------------------------------------------: |
|      need      | Boolean  | `true` 或者 `false` |    必选参数，是否开启鉴权模块，这里必须为 `true`     |
| authentication | Function |  return:_Promise_   | 必选参数，登录鉴权方法，返回包含鉴权结果的 `promise` |

!> cluster 模式下 `auth` 节点仅需在 dashboard 进程启动参数中带上即可。cluster 模式下此参数对 embrace 进程无效。

#### 2. 登录鉴权 + 项目鉴权

相比上面的仅做登录鉴权，这里多了一个登录用户和项目之间的映射关系鉴权，这样可以保证大家的项目嵌入的 embrace 进程都接入同一个 dashboard 集群的情况下，依旧可以避免项目无关的人员进行内核分析操作。样例如下所示:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  project_name: 'PlayStation',
  auth: {
    need: true,
    admin: ['wjy1992'],
    project_auth: {
      buycoor: 'admin',
    },
    /**
		 @param {string} user 用户名
		 @param {string} pass 用户键入密码
		 @return {promise}
		 **/
    authentication(user, pass) {
      return new Promise(resolve => {
        if ((user === 'admin' && pass === '123456') || (user === 'wjy1992' && pass === '123456')) resolve(true);
        else resolve(false);
      });
    },
  },
});
```

传入对象增加的 `auth` 节点的参数说明:

|      参数      |   类型   |         值          |                                                   说明                                                    |
| :------------: | :------: | :-----------------: | :-------------------------------------------------------------------------------------------------------: |
|      need      | Boolean  | `true` 或者 `false` |                               必选参数，是否开启鉴权模块，这里必须为 `true`                               |
|     admin      |  Array   |       不固定        |     必选参数，数组里面为字符串，代表每一个 admin 用户的用户名称，admin 用户具有 `所有项目` 的操作权限     |
|  project_auth  |  Object  |       不固定        | 必选参数，对象中的 key 是 `字符串`，代表项目名称；value 是 `数组`，数组中每一项为该项目允许操作的用户名称 |
| authentication | Function |  return:_Promise_   |                           必选参数，登录鉴权方法，返回包含鉴权结果的 `promise`                            |

!> 此模式下必须配置 `auth.admin`，如果没有 admin 参数，则认为是第一种简单鉴权模式。cluster 模式下 `auth` 节点仅需在 dashboard 进程启动参数中带上即可。cluster 模式下此参数对 embrace 进程无效。

### - 虚拟路径转发

fe-monitor 使用过程中，有一部分公司对服务器开启的端口数做了限制，所以需要提供一个虚拟路径前缀，以方便 nginx 等反向代理工具根据路径做转发。

可以通过在传入 fe-monitor 的启动参数中增加 `http` 节点，来开启虚拟路径转发的功能，样例如下所示:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  project_name: 'buycoor',
  http: {
    prefix: '/monitor',
  },
});
```

启动后，可以在 nginx 中配置将 `/monitor` 转发至对应的 fe-monitor 启动的 Dashboard 端口即可访问。

Nginx.conf 配置转发样例如下:

```bash
server {
	listen 80;
	server_name www.fe-monitor.cn;
	charset utf-8;
	access_log  /var/log/nginx/fe_monitor.access.log  main;

	location ~ ^/(monitor.*) {
		proxy_pass http://127.0.0.1:12333/$1;
	}
}
```

这里可以看到，所有以 `/monitor` 开始的 URL，均会被转发到本地的 12333 端口，即 fe-monitor 的 Dashboard 启动的 Http 展示服务器的端口，这样就达到了虚拟路径转发的目的。

!> cluster 模式下 `http` 节点仅需在 dashboard 进程启动参数中带上即可。cluster 模式下此参数对 embrace 进程无效。

## **IV. 通用配置**

fe-monitor 绝大多数允许开发者定制的参数都是为了 `cluster` 部署和 `定制私有通信方案` 而设计的，而这些涉及到的参数在 [定制化](#iii-定制化) 一节中已经介绍了。

下面主要介绍一些通用配置项，包含日志等模块。

### - 项目名称

fe-monitor 在默认的 [快速开始](#ii-快速开始) 模式下，传入字符串即代表了项目名称，我们同样可以在传入的启动参数对象中增加 `project_name` 参数来设置项目名称，样例如下:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  project_name: 'buycoor',
});
```

!> 项目名称默认为 `process.title`，cluster 模式下 `project_name` 节点仅需要在 embrace 进程启动参数中带上即可，标识业务进程名称。cluster 模式下此参数对 dashboard 进程无效。

### - 日志级别

fe-monitor 通过在传入的启动参数中增加 `log_level` 来调整模块输出的日志级别，样例如下:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  project_name: 'buycoor',
  log_level: 3,
});
```

`log_level` 日志级别一共有四种：

| 日志级别 |         含义          |
| :------: | :-------------------: |
|    0     | 输出 `error` 级别日志 |
|    1     | 输出 `warn` 级别日志  |
|    2     | 输出 `info` 级别日志  |
|    3     | 输出 `debug` 级别日志 |

!> 默认输出 `info` 级别日志，`log_level` 设置无论是默认模式还是 cluster 模式下的 dashboard 和 embrace 进程，均会生效。

### - 离线文档

fe-monitor 项目本身也包含了使用文档，但是为了纯粹默认文档不展示，通过在传入的启动参数配置 `need_document` 来开启离线文档，样例如下:

```js
'use strict';
const femonitor = require('fe-monitor');
femonitor({
  project_name: 'buycoor',
  need_document: true,
});
```

!> 离线文档开启后，在监控首页的右下角点击 `Docs` 即可进入。cluster 模式下 `need_document` 节点仅需在 dashboard 进程启动参数中带上即可。cluster 模式下此参数对 embrace 进程无效。

## **V. 动态更新配置**

在 fe-monitor 的部署过程中，也经常会遇到需要动态更改配置需求的时候：想给当前项目增加一个用户，想动态调整下 CPU-Profiling 结果展示的数目...

我们确实可以通过上面的 [定制化](#iii-定制化) 和 [通用配置](#iv-通用配置) 两节中的方式，修改 fe-monitor 启动参数来达到同样的目的，但是修改配置后需要重新发布，这样略显繁琐，因此这里也提供了一套动态更新配置的机制。

### - 开启动态更新配置

fe-monitor 从 **v2.1.0** 版本及以上开始，进入 dashboard 首页后看到项目列表，那么 **点击项目的标题**，即可开启动态调整配置的 Modal 弹出框。

这个 Modal 弹出框中展示出了允许使用者动态更新的配置，目前包含四大类：

- **常规动态配置项:**
  - 日志级别 ( 默认是 `info` 级别 )
  - 是否开启子进程分析采集的 CPU/Memory 数据 ( 默认是 `开启子进程` 分析 )
- **CPU 动态配置项:**
  - 是否开启自定义过滤 ( 默认 `开启过滤` )
  - 对程序进行 CPU-Profiling 的时间长短 ( 默认 `5s` )
  - 展示执行耗费最长的函数列表数量，从高到低排序 ( 默认展示 `5` 条 )
- **Memory 动态配置项:**
  - 结果中是否展示 Root 节点起始的引力图 ( 默认 `展示` )
  - 内存泄漏排查时给出的疑似泄漏点个数 ( 默认提供最大的 `5` 个 )
  - 引力图结果中每一个节点的子节点展示个数 ( 默认展示 `5` 个子节点 )
  - Root 起始节点的引力图展示的深度 ( 默认深度为 `6` )
  - 每一个疑似泄漏点为起始节点的引力图展示的深度 ( 默认深度为 `25` )
- **Auth 动态配置项:**
  - Admin 用户名称列表 ( `admin 用户`才允许新增或者修改 )
  - 项目普通用户名称列表 ( `admin 用户` 或者 `有项目本身的权限的用户` 可更改 )

使用者将上述可配置项修改完毕后，点击此 Modal 弹出框右下角的 **确定**，即可通知 fe-monitor 在不重启的情况下让配置动态修改并且立即生效。

!> Auth 动态配置项，仅在开启 auth 鉴权模块下才会生效和允许更改，如何开启 auth 鉴权可以参见 [定制化 - 权限模块](#-权限模块)。
