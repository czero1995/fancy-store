const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const isProduction = process.env.NODE_ENV === "production";
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

// cdn预加载使用
const externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    "vue-i18n": "VueI18n",
    vuex: "Vuex",
    axios: "axios",
    Vconsole: "vconsole"
};

const cdn = {
    // 开发环境
    dev: {
        css: [""],
        js: []
    },
    // 生产环境
    build: {
        css: [""],
        js: [
            "https://cdn.bootcss.com/vue/2.6.6/vue.min.js",
            "https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js",
            "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
            "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
            "https://cdn.bootcss.com/vue-i18n/8.11.1/vue-i18n.min.js",
            "https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js"
        ]
    }
};
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath: "/",
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        https: false,
        hotOnly: false,
        proxy: "http://localhost:9093/api/"
    },
    configureWebpack: config => {
        if (isProduction) {
            //   externals里的模块不打包
            Object.assign(config, {
                externals: externals
            });
            // 移除console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
            // 开启gzip压缩
            const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                }),
                new PrerenderSPAPlugin({
                    // 生成文件的路径，也可以与webpakc打包的一致。
                    // 下面这句话非常重要！！！
                    // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                    staticDir: path.join(__dirname, "dist"),
                    // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
                    routes: ["/", "/product", "/category", "/cart", "/member", "/register", "/login", "/info", "/order", "/address", "/addaddress", "/detail", "/orderwait", "/set"],
                    // 这个很重要，如果没有配置这段，也不会进行预编译
                    renderer: new Renderer({
                        inject: {
                            foo: "bar"
                        },
                        headless: true,
                        // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                        renderAfterDocumentEvent: "render-event"
                    })
                })
            );
            // 打包后模块大小分析//npm run build --report
            if (process.env.npm_config_report) {
                config.plugins.push(new BundleAnalyzerPlugin());
            }
        }
        config.devtool = "source-map";
    },
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: config => {
        // 添加CDN参数到htmlWebpackPlugin配置中
        config.plugin("html").tap(args => {
            if (process.env.NODE_ENV === "production") {
                args[0].cdn = cdn.build;
            }
            if (process.env.NODE_ENV === "development") {
                args[0].cdn = cdn.dev;
            }
            return args;
        });
        config.resolve.alias
            .set("@$", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("api", resolve("src/api"))
            .set("mixins", resolve("src/mixins"))
            .set("components", resolve("src/components"))
            .set("views", resolve("src/views"));
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: isProduction ? true : false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        // 启用 CSS modules for all css / pre-processor files.
        modules: false,
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ["*"]
                    })
                ]
            }
        }
    }
};
