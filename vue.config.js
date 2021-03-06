// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
        publicPath: "./", // 公共路径(必须有的)
        outputDir: "dist", // 输出文件目录
        assetsDir: "static", //静态资源文件名称
        lintOnSave: false,
        productionSourceMap: false, //去除打包后js的map文件
        // devServer: { //启动项目在8080端口自动打开
        //     open: true,
        //     port: 3000,
        //     proxy: null
        // },
        //去掉console
        publicPath: process.env.NODE_ENV === 'production'
        ? './' : '/',
    
    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/assets/icons')
        //config是vue吧webpack的API封装了，暴露给我们的一个对象

        config.module
            .rule('svg-sprite')
            .test(/\.svg$/)//文件是以.svg结尾,就遵循这个（svg-sprite）规则
            .include.add(dir).end()//包含icons的目录
            .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()//满足规则后使用这个loader,不需要解析出来的文件
            .use('svgo-loader').loader('svgo-loader')
            .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]}))//发现加载了svg，如果里面有fill属性就删除
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
        config.module.rule('svg').exclude.add(dir)//其他svg loader排除icons目录
    }
}
