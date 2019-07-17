const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/lence/',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
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
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 生产环境，开启Gzip压缩
            config.plugins.push(
                new CompressionWebpackPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            );

        }
    },
    // CSS 相关选项
    css: {
        extract: true,
        // 是否开启 CSS source map？
        sourceMap: false,
        // 为预处理器的 loader 传递自定义选项。比如传递给
        // sass-loader 时，使用 `{ sass: { ... } }`。
        loaderOptions: {}, // 为所有的 CSS 及其预处理文件开启 CSS Modules。
        modules: false
    },
    // 在多核机器下会默认开启。
    parallel: require('os').cpus().length > 1,
}
