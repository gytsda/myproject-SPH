// 对于axios进行二次封装
import axios from 'axios'
//引入进度条  //start:进度条开始 done：进度条结束
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"

//1来利用axios对象的方法create 创建一个实例
//2：reques就是axios，只不过要稍微配置一下
const requests = axios.create({
    //基础路径，发请求的时候路径里面有/api  就不需要我们写了
    baseURL: '/mock',
//    代表请求超时的时间5s
    timeout: 5000
})

//请求拦截器:在发请求之前你，请求拦截器可以检测到,可以在请求发出去之前处理一些事情

requests.interceptors.request.use((config) => {

    //进度条开始
    nprogress.start();
    //config：配置对象 包含了headers请求头
    return config
})

//响应拦截器
requests.interceptors.response.use((res) => {

//    进度条结束
    nprogress.done();
//    成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
}, (error) => {
    //响应失败的回调函数  终止promise
    return Promise.reject(new Error("faile"))
})

//对外暴露
export default requests;
