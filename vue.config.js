const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    publicPath: "./",
    css: {
        loaderOptions: {
            css: {
                // options here will be passed to css-loader
            },
            postcss: {
                // options here will be passed to postcss-loader
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 32
                    })
                ]
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            return {
                plugins: [new BundleAnalyzerPlugin()]
            };
        }
    }
};
