module.exports = {
  // publicPath: './',
  // outputDir: 'dist',
  // assetsDir: 'assets',
  // indexPath: 'index.html',
  // filenameHashing: true,
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     template: 'public/index.html',
  //     filename: 'index.html',
  //     // title: 'Index Page',
  //     chunks: [
  //       // 'chunk-vendors',
  //       // 'chunk-common',
  //       'index'
  //     ]
  //   },
  //   subpage: 'src/main.js'
  // },
  // lintOnSave: true,
  // transpileDependencies: [],
  // productionSourceMap: false,
  // crossorigin: '',
  // integrity: false,
  // configureWebpack: {},
  // chainWebpack: () => { },
  // parallel: false,
  // pwa: {},
  // pluginOptions: {}
  devServer: {
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9080,
    https: false,
    // proxy: 'http://localhost:8080',
    public: 'http://wxweb-local.80points.com.cn',
    // hotOnly: false,
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 换算的基数 默认为37.5，一般不建议修改它，使用vant ui框架中也是默认37.5
            rootValue : 37.5,
            // 忽略转换正则匹配项，插件会转化所有的样式的px。比如引入了三方UI，也会被转化.
            //项目中有不需要自动转换成PX的样式，就在此添加，如: .vant  表示 .vant 开头的都不会转换
            selectorBlackList  : [],
            propList   : ['*'], //属性的选择器，*表示通用
          }),
        ]
      }
    }
  },
}
