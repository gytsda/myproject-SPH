/*search仓库*/
import {reqGetSearchInfo} from "@/api";

const state = {
    //仓库初始状态
    searchList: {}

};
const mutations = {
    GETSEARCHLIST(state, searchList) {

        state.searchList = searchList;
    }
};
const actions = {
//    获取search模块数据   {}是es新特性  如果没有传递参数的话给个默认值

    async getSearchList({commit}, params = {}) {
        //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)，从哪里来？
        //params形参：是当用户派发(dispatch)的时候，第二哥参数传递过来的，至少是一个空对象

        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
};
//计算属性，为了简化数据而生
//项目中getters主要的作用是:简化仓库中的数据
// 可以把我们将来在组件当中需要用的数据简化一下[将来组件在获取数据的时候更加方便]
const getters = {
//    state是当前仓库的state 而不是home仓库的并不是大仓库中的state
    goodsList(state) {
        //这样写有点问题
        //这里是为了没网的时候返回一个空数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[];
    },
    attrsList(state) {
        return state.searchList.attrsList||[];
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
