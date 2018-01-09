## 基于Vue2.0、Vuex、Vue-router、Axios实现的零食商城

![](http://www.z4a.net/images/2018/01/08/1.gif)

在线访问:[github.czero.cn/fancy](http://github.czero.cn/fancy)

手机扫描二维码查看:

![](https://user-gold-cdn.xitu.io/2018/1/8/160d55bfb67d4f92?w=280&h=280&f=png&s=1562)
 
[点击下载安卓apk安装包](http://github.czero.cn/fancyapp.apk)


### 项目主架构

![](https://user-gold-cdn.xitu.io/2018/1/8/160d562efa48d77c?w=515&h=751&f=png&s=93340)

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

## 设计布局: 

* HTML5 
* CSS3 
* Less
* rem(阿里用的那套rem算法)
* Flex(弹性布局)
* vue-touch(用于实现购物车左滑删除功能)
* 动画（vue原生transition实现原生app的效果）
	
## 数据请求：

* Mock(模拟后台数据)
* Axios(请求数据)

## 逻辑交互：

* vue(数据渲染,各个组件间的数值传递)
* vue-router(组件间的路由跳转)
* vuex(全局状态的管理)
## 优化方案: 

* 腾讯智图(压缩图片，减少图片的体积) 
* vue-lazyload(图片懒加载，缓解加载数据,提高网页性能)
* fastclick(解决移动端300ms延迟，提高页面交互流畅度)
* vue-rouer(路由懒加载,分离app的js为多个js文件，到对应的页面再执行对应的js)
* webpack(config/index.js文件内的 productionSourceMap改为false,这样打包出来的文件可以没有.map结尾的js文件，且文件体积减少至少一半)

## bug(不影响)
    
    因为是用Mock模拟后台的数据，点击添加同个商品多次的时候，不是只增加数量，没像真实调用后台的数据那样。
    因为是用的vuex做的数据存储，没有添加多的逻辑判断。
   
## 实现细节

### 媲美原生的页面前进和后退的动画实现:

![](http://www.z4a.net/images/2018/01/08/2.gif)

* 指定transition:name

![](https://user-gold-cdn.xitu.io/2018/1/8/160d5651095fe0fb?w=954&h=272&f=png&s=23216)

* 在data中声明默认的进出动画
 

![](https://user-gold-cdn.xitu.io/2018/1/8/160d5654c843026e?w=494&h=241&f=png&s=10764)

* 在mounted()数据渲染初始化完成之后进行判断
 

![](https://user-gold-cdn.xitu.io/2018/1/8/160d5659218ecb69?w=1091&h=499&f=png&s=39885)

* 拿到vuex的状态值
 

![](https://user-gold-cdn.xitu.io/2018/1/8/160d56747251259a?w=818&h=146&f=png&s=7276)


* 然后进行判断

![](https://user-gold-cdn.xitu.io/2018/1/8/160d565df58b615b?w=818&h=146&f=png&s=7276) 

* 最后将当前的组件名字传给vuex,实现不同的组件进去就有不同的切换动画。


#### 下一页动画

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
    
### 返回上一页动画
    .slide-back-enter-active,
    .slide-back-leave-active {
        transition: all .5s;
    }
    
    .slide-back-enter,
    .slide-back-leave-to {
        transition: all .5s;
        transform: translate3d(-100%, 0, 0);
    }


## 购物车左滑删除

![](http://www.z4a.net/images/2018/01/08/3.gif)

### v-touch
在css中设置好删除按钮的偏移量

    -webkit-transform: translate(-12%, 0);
	-webkit-transition: all 0.3s linear;
	
## 左右滑方法

![](https://user-gold-cdn.xitu.io/2018/1/8/160d569747db9f86?w=352&h=206&f=png&s=9226)

滑动的时候触发select样式，进行绑定

让当前的列表项==购物车的列表，样式会被激活，出现左滑删除

![](https://user-gold-cdn.xitu.io/2018/1/8/160d56a1ab7109f1?w=694&h=29&f=png&s=3335)
![](https://user-gold-cdn.xitu.io/2018/1/8/160d5668cda86f5e?w=1082&h=64&f=png&s=10268)

    注意页面的盒子使用盒子之后会和原生页面出现冲突，导致滑动不流畅
    因此，需要在main.js指定默认的滑动方式为横向滑动触发


![](https://user-gold-cdn.xitu.io/2018/1/8/160d576c6d2c1bf8?w=713&h=86&f=png&s=6668)
## 订单页面，点击顶部导航和左右滑动进行组件的切换以及动画样式的判断

![](http://www.z4a.net/images/2018/01/08/5.gif)

也是使用的v-touch组件，实现方式和组件切换类似。
我给每个订单状态的组件一个不同的数字，根据这个数字，判断组件是左滑动的动画还是又滑动的动画

![](https://user-gold-cdn.xitu.io/2018/1/8/160d56b4c0d25103?w=657&h=160&f=png&s=11547)
![](https://user-gold-cdn.xitu.io/2018/1/8/160d56b3e31093b2?w=389&h=145&f=png&s=9858)

# 使用说明

	#克隆项目
	git clone https://github.com/czero1995/fancy-store.git
	
	# 安装依赖
	npm install
	
	# 本地开发环境 访问http://localhost:8080
	npm run dev
	
	# 构建生产
	npm run build
