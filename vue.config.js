const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    //打包的时候Map类型文件不打包
    productionSourceMap:false,
    transpileDependencies: true,
    //关闭ESlink校验
    lintOnSave: false,
    //配置代理跨域
    devServer: {
        open: true,
        proxy: {
            //api带有/api的地址会去下面地址发请求
            "/api": {
                //target数据来自于哪台服务器
                target: "http://gmall-h5-api.atguigu.cn",

            //    路径重写
            //     pathRewrite:{"^/paas":""}
            },
        },
        // 修改启动的端口号  http://localhost:8082/
        port: 8082,
        host: 'localhost'

    }
})
