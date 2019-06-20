module.exports = {
    publicPath: '/lence/',
    //配置webpack
    chainWebpack: (config) => {
        //打包分析插件
        if(process.env.NODE_ENV === "production"){
            if(process.env.report){
                config
                .plugin('webpack-bundle-analyzer')
                .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
                .end();
                config.plugins.delete('prefetch')  // 弃用预先加载插件
            }
        }
    }

}
