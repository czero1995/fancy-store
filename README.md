# fancy

> a fancy store

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

预览地址:[github.czero.cn/fancy](github.czero.cn/fancy)

欢迎Star和Fork，欢迎交流和分享。

### 项目主架构
![](http://www.z4a.net/images/2017/12/24/fancy_main.md.jpg)


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

#### 设计布局: 

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

