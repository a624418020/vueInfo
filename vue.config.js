module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 100, // 换算的基数(设计图375的根字体为10)
                        propList: ['*'],
                        selectorBlackList:['van*','van-']
                    }),
                    require('autoprefixer')({ // 把px单位换算成rem单位
                        browsers: ['Android >= 4.4','Firefox >= 20', 'iOS >= 8']
                    })
        ]
            }
        }
    },
    baseUrl: "/",
    outputDir: "dist",
    assetsDir: "market",
}

