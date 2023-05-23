import {reqCategoryList, reqGetBanerList, reqFloorList} from "@/api";
/*home模块的小仓库*/
/*仓库中的state的数据格式，数据格式取决于服务器返回的格式*/
const state = {
    //state中数据默认初始值别瞎写,服务器返回对象,初始值是对象，服务器返回的是数组，初始值就是数组。由服务器返回值决定初始化
    categoryList: [],
    //轮播图数据
    bannerList: [],

    //floorList组件的数据
    floorList: []
};
//mutions是唯一修改state的地方
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;

    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList

    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};

const actions = {
    /*通过API里面的接口函数调用向服务器发请求获取数据*/
    async categoryList({commit}) {
        // 发请求
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }

    },
//    获取首页轮播图
    async getBannerList({commit}) {

        let result = await reqGetBanerList();
        if (result.code == 200) {
         commit("GETBANNERLIST", result.data);
        }
    },
//    获取floor数据
    async getFloorList({commit}) {
        let result = await reqFloorList();
        if (result.code == 200) {
//    提交Mutation
            commit("GETFLOORLIST", result.data)
        }

    }
};

const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}
