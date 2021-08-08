module.exports = {
    configureWebpack: {
        // resolve：用来配置路径相关
        resolve: {
            // 给文件配置别名
            alias:{
            // 内部已经配置过一个默认的别名了
            //     '@':'src',
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',


            }
        }
    }
}


