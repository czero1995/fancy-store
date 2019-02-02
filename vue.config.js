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
    }
};
