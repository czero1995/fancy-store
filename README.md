![](https://user-gold-cdn.xitu.io/2018/1/8/160d5877d1923662?w=370&h=661&f=gif&s=2564480)

在线地址:[https://fancy.czero.cn](http://fancy.czero.cn)

手机扫描二维码查看:



![](https://user-gold-cdn.xitu.io/2018/7/25/164d1c98a029c222?w=280&h=280&f=png&s=1411)
 
[点击下载安卓apk安装包](http://github.czero.cn/fancyapp.apk)

源码地址:[https://github.com/czero1995/fancy-store](https://github.com/czero1995/fancy-store)


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
*动画（vue原生transition实现原生app的效果）
	
## 数据请求：

* Mock(模拟后台数据)
* Axios(请求数据)

## 逻辑交互：

* vue(数据渲染,各个组件间的数值传递)
* vue-router(组件间的路由跳转)
* vuex(全局状态的管理)


## 调试
* vConsole(在移动端查看调试器)

## 优化方案: 

* 腾讯智图(压缩图片，减少图片的体积) 
* vue-lazyload(图片懒加载，缓解加载数据,提高网页性能)
* fastclick(解决移动端300ms延迟，提高页面交互流畅度)
* vue-rouer(路由懒加载,分离app的js为多个js文件，到对应的页面再执行对应的js)
* webpack(config/index.js文件内的productionSourceMap改为false,这样打包出来的文件可以没有.map结尾的js文件，且文件体积减少至少一半)

## Vuex刷新保存状态

使用Vuex做状态管理的时候，当用户刷新页面，Vuex里面的状态会全部丢失，从而引起程序的一场。解决思路是在creared()钩子函数里面添加以下方法:
	
	created(){
	   console.log('页面执行刷新时，保存Vuex的状态到LocalStorage')
	    //在页面加载时读取localStorage里的状态信息
	    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
	    
	    //在页面刷新时将vuex里的信息保存到localStorage里
	    window.addEventListener("beforeunload",()=>{
	        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
	    })
	  }  
上面代码的原理是，当页面刷新时，会将当前Vuex的状态存储到LocalStorage里面，刷新成功，再从LocalStorage赋值到Vuex里面.      
## 实现细节

### 媲美原生的页面前进和后退的动画实现:

![](https://user-gold-cdn.xitu.io/2018/1/8/160d563c011aa615?w=363&h=667&f=gif&s=2186583)

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

![](https://user-gold-cdn.xitu.io/2018/1/8/160d56a518a48853?w=363&h=667&f=gif&s=610309)

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

![](https://user-gold-cdn.xitu.io/2018/1/8/160d56aac5ce5fca?w=363&h=667&f=gif&s=543096)

也是使用的v-touch组件，实现方式和组件切换类似。
我给每个订单状态的组件一个不同的数字，根据这个数字，判断组件是左滑动的动画还是又滑动的动画

![](https://user-gold-cdn.xitu.io/2018/1/8/160d56b4c0d25103?w=657&h=160&f=png&s=11547)
![](https://user-gold-cdn.xitu.io/2018/1/8/160d56b3e31093b2?w=389&h=145&f=png&s=9858)

### Vue-CLI Webpack构建优化
#### 只黏贴关键部分的代码
* 使用Happypack多线程打包构建

在**build/webpack.base.cong.js**下添加如下代码

		const HappyPack = require('happypack')
		const os = require('os')
		const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

		 plugins: [
		    new HappyPack({
		      id: 'happy-babel-js',
		      loaders: ['babel-loader?cacheDirectory=true'],
		      threadPool: happyThreadPool,
		    })
		  ],
		  
		{
	        test: /\.js$/,
	        // loader: 'babel-loader',
	        loader: 'happypack/loader?id=happy-babel-js', // 增加新的HappyPack构建loader
	        exclude: /node_modules/,
	        include: [resolve('src')]
	      },

* babrl-loader开启缓存

* 启用DllPlugin和DllReferencePlugin预编译库文件


第三方库文件单独打包一次，以后的编译都不需要在编译打包第三方库

在**build/**文件夹下新建**webpack.dll.config.js**文件,复制一下代码:

		const path = require("path")
		const webpack = require("webpack")
		
		module.exports = {
		    // 你想要打包的模块的数组
		    entry: {
		        vendor: ['vue/dist/vue.esm.js', 'axios', 'vue-router', 'vuex']
		    },
		    output: {
		        path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
		        filename: '[name].dll.js',
		        library: '[name]_library'
		    },
		    plugins: [
		        new webpack.DllPlugin({
		            path: path.join(__dirname, '.', '[name]-manifest.json'),
		            name: '[name]_library',
		            context: __dirname
		        }),
		        // 压缩打包的文件
		        new webpack.optimize.UglifyJsPlugin({
		            compress: {
		                warnings: false
		            }
		        })
		    ]
		}
在**build/webpack.dev.config.js**和**build/webpack.prod.config.js**中添加plugins

		new webpack.DllReferencePlugin({
		      context: __dirname,
		      manifest: require('./vendor-manifest.json')
		}),
		
在**根目录下的index.html**下引入预编译的库

	 	<script src="./static/js/vendor.dll.js"></script>

在**package.json/scripts**下中添加dll命令

    "dll": "webpack --config ./build/webpack.dll.config.js"
    
运行:

	npm run dll
	
然后再

	npm run dev或npm run build
	

## Vue-cli开启PWA(Service Worker)和引入骨架屏

![](https://user-gold-cdn.xitu.io/2018/7/25/164d1bf4111ff701?w=2712&h=1150&f=png&s=769314)

![](https://user-gold-cdn.xitu.io/2018/7/25/164d1bf8aecc348e?w=2840&h=1076&f=png&s=527706)

参考文章:

[https://github.com/czero1995/vue-pwa-skeleton](https://github.com/czero1995/vue-pwa-skeleton)

[https://zhuanlan.zhihu.com/p/37408373](https://zhuanlan.zhihu.com/p/37408373)

## 持续集成服务 Travis CI

利用Travis CI，监听Github项目master，一旦检测到master有代码变动，自动执行脚本，并把编译打包完成的项目自动发送部署到服务器，不用再像以前一样，需要ssh登录到服务器，再执行git pull操作。
本地添加.travis.yml

    language: node_js
    node_js:
    - 8
    branchs:
      only:
      - master
    before_install:
    - openssl aes-256-cbc -K $encrypted_87bf11d507f0_key -iv $encrypted_87bf11d507f0_iv
      -in id_rsa.enc -out ~/.ssh/id_rsa -d
    - chmod 600 ~/.ssh/id_rsa
    - echo -e "Host 47.98.240.154\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
    script:
    - npm install cnpm --registry=https://registry.npm.taobao.org
    - cnpm install
    - npm run build
    - scp -r dist root@47.98.240.154:/var/www/html/fancy
    - 



遇到了很多的坑，失败了无数次，终于知道问题所在:

![](https://user-gold-cdn.xitu.io/2018/7/25/164d1b1333bfc7ce?w=1577&h=980&f=png&s=191206)


## 生产环境错误监控
[sentry](https://sentry.io/welcome/)是国外开源的错误监控库，有线上环境，也可以部署到自己的服务器，可以跟踪错误出现的步骤和错误的详细信息，方便开发人员进行快速定位。
![](https://user-gold-cdn.xitu.io/2018/7/25/164d1b8eb9c5276d?w=1204&h=426&f=png&s=96403)

## 免费升级到HTTPS
`升级到https后，服务器可以开启http2.0版本，对比http1.x性能和缓存各方面要更好，还有其他新特性，
可以启动service work功能，更好的进行离线缓存，更好的离线体验。
HTTPS证书可以免费申请，阿里云跟腾讯云都可以申请，按照文档指示进行申请下载，然后将下载的证书上传到服务器，配置服务器的内容，就可以开启https、http2.0、service work等功能了。
`


# 使用说明

	#克隆项目
	git clone https://github.com/czero1995/fancy-store.git
	
	# 安装依赖
	npm install
	
	# DLL构建库(提高打包和编译的速度)
	npm run dll

	# 本地开发环境 访问http://localhost:8080
	npm run dev
	
	# 构建生产
	npm run build

