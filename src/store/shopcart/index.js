import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from '@/api/index'

const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;

    }
};
const actions = {
    //获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code == 200) {

            commit('GETCARTLIST', result.data)
        }

    },
//    删除购物车某一个产品
    async deleteCartListById({commit}, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }

    },
//   修改购物车某一个产品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {

        let result = await reqUpdateCheckedById(skuId, isChecked);

        if (result.code == 200) {
            // return 'ok'
            //和上面直接return ok 一样的效果,async函数返回结果是一个Promise对象
            return Promise.resolve('ok');
        } else {
            return Promise.reject(new Error(' update checked faile'))
        }

    },
//    删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}) {
        //    context:小仓库   里面有commit【提交mutatios修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //     获取购物车中全部得产品[是一个数组]
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            //  返回得是一个promise
            let promise= item.isChecked == 1 ? dispatch('deleteCartListById', item.skuId) : '';
            // promise.all([p1,p2,p3])
            //    p1|p2|p3:每一个都是promise对象，如果有一个promise失败，都失败，如果都成功返回得结果都成功
            //将每一次返回得Promise添加到数组当中
            PromiseAll.push(promise);
        });
        // 只要全部得p1|p1|...都成功，返回结果即为成功
        //如果有一个失败，返回即为失败
        return Promise.all(PromiseAll)

    },
//    修改全部产品的状态
    upDateAllCartIsChecked({dispatch, state}, isChecked) {
        //   数组
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked});
            PromiseAll.push(promise)
        })
    //    最终返回结果
        return Promise.all(PromiseAll);
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}