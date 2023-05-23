import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from '@/router'

//三级联动组件---全局组件
import TypeNav from "@/components/TypeNav"
import Carsousel from "@/components/Carousel"
import Pagination from "@/components/Pagination";
/*//测试s使用n
import  {reqCategoryList} from '@/api'
reqCategoryList();*/

//引入仓库Vuex
import store from '@/store'

//引入mockserve.js----mock虚拟数据
import "@/mock/mkckServe.js"

//引入swiper样式 这里不需要from引入   如果导入不赋值任意变量，可以直接import，不用from
import 'swiper/css/swiper.css'

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api'
//引入elment-ui插件
import {Button, MessageBox} from 'element-ui'
//引入图片懒加载(vue-lazyload)
import VueLazyload from "vue-lazyload";
import lazy from '@/assets/lazy.jpg'

//引入表单验证插件
import '@/plugings/VeeValidate'


//使用图片懒加载插件
Vue.use(VueLazyload,{
    //    懒加载默认的图片
    loading:lazy
});




//注册全局组件
//第一个参数是全局组件的名字 第二个参数是哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
//打开devtools工具
Vue.config.devtools = true;

//ElementUI 注册组件的时候，还有一种写法，挂载到原型上或者是Vue.use()
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


new Vue({
    render: h => h(App),
    //配置全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    //注册路由
    router,
    //注册仓库:组件实例上会多一个$store属性
    store,

}).$mount('#app')
