# fancy

> a little store

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

在线地址:[github.czero.cn/fancy](http://github.czero.cn/fancy)

手机扫描二维码:
 
安卓apk安装包:

源码地址:[https://github.com/czero1995/fancy-store](https://github.com/czero1995/fancy-store)


### 项目主架构

### 使用的库

* vue-cli (vue+webpack脚手架)
* vue-router(路由跳转)
* vuex(状态管理)
* axios(数据请求)
* mock.js(模拟后台数据)
* vue-touch(手势判断)
* fastclick(解决移动端浏览器 300 毫秒点击延迟问题)
* vue-lazyload(图片懒加载)
* swiper(轮播)


### 实现细节
媲美原生的页面前进和后退的动画实现:
下一页动画
.slide-go-enter-active,
.slide-go-leave-active {
    transition: all .5s;
    opacity: .8;
}

.slide-go-enter,
.slide-go-leave-to {
    transition: all .5s;
    transform: translate3d(100%, 0, 0);
    opacity: .8;
}
返回上一页动画
.slide-back-enter-active,
.slide-back-leave-active {
    transition: all .5s;
}

.slide-back-enter,
.slide-back-leave-to {
    transition: all .5s;
    transform: translate3d(-100%, 0, 0);
}
指定transition:name,
在data中声明默认的进出动画
在mounted()数据渲染初始化完成之后进行判断
首先拿到vuex的状态值
然后进行判断
最后将当前的组件名字传给后台
实现不同的组件进去就有不同的切换动画。

#购物车左滑删除
使用v-touch
在css中设置好删除按钮的偏移量
 左右滑方法
 滑动的时候触发select样式，进行绑定
 让当前的列表项==购物车的列表，样式会被激活，出现左滑删除

注意
页面的盒子使用盒子之后会和原生页面出现冲突，导致滑动不流畅
因此，需要在main.js指定默认的滑动方式为横向滑动触发


#订单页面，点击顶部导航和左右滑动进行组件的切换以及动画样式的判断
也是使用的v-touch组件，实现方式和组件切换类似
我给每个订单状态的组件一个不同的数字，根据这个数字，判断组件是左滑动的动画还是又滑动的动画

#打包安卓apk
测试布局和交互打包成混合应用是否会出现兼容问题。
用的是Hbuild，还没有调用到Dclode的API(上传图片，扫一扫，后续会添加这些功能，作出一个完成的混合应用.)
#### 设计布局: 
	将页面的固定布局position:fixed(比如Header,Footer)全部改为绝对布局position:absolute;
	因为fixed会出现莫名其妙的兼容性问题，比如在ios11或ios8下会失效，输入框软键盘激活之后会把底部的固定定位弹出去，导致布局错乱。
	用absolute实现fixed细节可以参考这篇

	HTML5 
	CSS3 
	Less
	rem(阿里用的那套rem算法)
	Flex(弹性布局)
	vue-touch(用于实现购物车左滑删除功能)
	动画（vue原生transition实现原生app的效果）
	
#### 数据请求：

	Mock(模拟后台数据)
	Axios(请求数据)

#### 逻辑交互：

	vue(数据渲染,各个组件间的数值传递)
	vue-router(组件间的路由跳转)
	vuex(全局状态的管理)
#### 优化方案: 

	腾讯智图(压缩图片，减少图片的体积) 
	vue-lazyload(图片懒加载，缓解加载数据,提高网页性能)
	fastclick(解决移动端300ms延迟，提高页面交互流畅度)
	vur-rouer(路由懒加载,分离app的js为多个js文件，到对应的页面再执行对应的js)
	webpack(config/index.js文件内的 productionSourceMap改为false,这样打包出来的文件可以没有.map结尾的js文件，且文件体积减少至少一半)


具体的实现可以看源码，关键部分，都做好了注释。
最近也在学习Node,
目前正在用Node.js、Koa2、和MongoDB写后台接口，增删改除的接口已经写好，可以参考这里
现在这在写后台前端添加商品的一些逻辑结构，用的是iview的后台UI框架。图片是用的七牛云存储。还有很多需要学习，还请多多交流和分享
