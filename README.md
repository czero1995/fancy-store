0 23:39:08
[图片]
0 05:47:14
vagrant init
0 05:47:36
vagrant init centos/7
0 05:47:49
vagrant up
0 05:48:38
vagrant ssh
0 05:48:46
sudo yum
0 05:48:55
exit
0 05:49:03
vagrant status
0 05:49:10
vagrant halt
0 05:49:23
vagrant destory
0 05:50:16
vagrant cloud
0 05:55:13
启动 docker systemctl start docker
0 05:55:27
docker version
0 05:55:36
docker run hello-world
0 06:00:08
docker-machine create demo
0 06:00:39
docker-machine ssh demo
0 09:15:23
[文件]
0 09:15:44
[文件]
0 12:10:02

# 在线预览:

[https://www.fancystore.cn/admin](https://www.fancystore.cn/admin)
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5df4ef0bc74c?w=1000&h=770&f=gif&s=5150586)

# 项目详情介绍:

[https://juejin.im/post/5cdca7595188257cf051a06a](https://juejin.im/post/5cdca7595188257cf051a06a)

# Github:

前端: [https://github.com/czero1995/fancy-store](https://github.com/czero1995/fancy-store)

服务端: [https://github.com/czero1995/fancy-store-server.git](https://github.com/czero1995/fancy-store-server.git)

后台管理 CMS: [https://github.com/czero1995/fancy-store-admin.git](https://github.com/czero1995/fancy-store-admin.git)

# 使用说明

框架具体结构和使用参考:[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

### 克隆项目

    git clone https://github.com/czero1995/fancy-store-admin.git

### 安装依赖

    # 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

### 启动服务

    npm run dev

### 构建生产环境

    npm run build:prod

0 12:11:06

# 在线预览:

[https://www.fancystore.cn](https://www.fancystore.cn)
![](https://user-gold-cdn.xitu.io/2019/5/17/16ac5dbf00191132?w=374&h=666&f=gif&s=1528988)

### 手机直接扫描二维码真机体验:

![](https://user-gold-cdn.xitu.io/2019/5/17/16ac3f6e813f1c21?w=256&h=256&f=png&s=6784)

# 项目详情介绍:

[https://juejin.im/post/5cdca7595188257cf051a06a](https://juejin.im/post/5cdca7595188257cf051a06a)

## 历史版本

1. 基于 Vue-CLI2.0:[点我查看](https://github.com/czero1995/fancy-store/tree/vue-cli2.0)

   `这个分支版本是一两年前的，基于Vue-CLI2.0写的，数据请求是Mock，纯前端的项目。`

2. 基于 Vue-CLI3.0:[点我查看](https://github.com/czero1995/fancy-store/tree/vue-cli3--mock)

   `这个分支版本是基于Vue-CLI3.0的，将脚手架从2.0迁移升级到了3.0，遇到的一些问题和坑也都填完了~也是纯Web端Mock模拟数据的项目。`

# Github:

前端: [https://github.com/czero1995/fancy-store](https://github.com/czero1995/fancy-store)

服务端: [https://github.com/czero1995/fancy-store-server.git](https://github.com/czero1995/fancy-store-server.git)

后台管理 CMS: [https://github.com/czero1995/fancy-store-admin.git](https://github.com/czero1995/fancy-store-admin.git)

# 使用说明

### 克隆项目

    https://github.com/czero1995/fancy-store.git

### 安装依赖

    # 预渲染需要安装PrerenderSPAPlugin库，npm install会无法安装Chromuim，建议使用cnpm
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    cnpm install

### 启动服务

    npm run serve

### 构建生产环境

    npm run build
