import {reqGoodsInfo, reqAddOrUpdateShopCart} from "@/api";
//封装游客身份模块uuid ---生成一个随机字符串(不能在变了)
import {getUUID} from '@/utils/uuid_token.js'

const state = {
    goodInfo: {},
//    游客临时身份
    uuid_token: getUUID()

};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;

    }
};
const actions = {
//获取产品信息的action
    async getGoodInfo({commit}, skuId) {
        let result = await reqGoodsInfo(skuId);

        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
//    将产品添加到购物车中||修改某一个产品的个数
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        //加入购物车返回的结构
        //加入购物车以后(发请求),前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        //因为服务器没有返回其余数据，因此不需要考虑三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //代表服务器加入购物车成功
        if (result.code == 200) {
            //相当于return 'ok'
            return Promise.resolve('ok')
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));

        }
    }
};
//简化数据而生
const getters = {
    //路径导航简化数据
    categoryView(state) {
        // 服务器数据还没返回   比如：state.goodInfo初始状态为空对象，空对象category属性值为undefined 所以会报错  或上一个空对象
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
//    产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};


export default {
    state,
    mutations,
    actions,
    getters
}
