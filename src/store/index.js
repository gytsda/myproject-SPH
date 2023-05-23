import Vue from 'vue'
import Vuex from 'vuex'

//使用Vuex插件
Vue.use(Vuex);


import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'
/*对外暴露Store类的一个实例*/
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})


/*这样些代码太多的话分不清，用模块化比较好*/
// //对外暴露Stroe类的一个实例
// export default new Vuex.Store({
//     mutations,
//     state,
//     actions,
//     getters})
/*
//state仓库存储数据的地方
const state={}
//mutations:修改state的唯一手段
const mutations={}
//actions:处理action,可以书写业务逻辑或者处理异步
const actions={};
//getters：理解为计算属性，用于简化仓库数据,让组件或缺更加方便
const getters={}*/
