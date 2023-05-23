/*当前这个模块:API进行统一管理
*请求地址："https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"
*get请求  无参数
*
*  */
import requests from './ajax'
import mockRequests from './mockAjax'

export const reqCategoryList = () => {
    //发请求:axios发请求返回结果Promise对象 不写return的话返回值是undefined
    return requests({url: "/product/getBaseCategoryList", method: "get"})
}
//获取banner(Home首页轮播图接口)
export const reqGetBanerList = () => {
    //发请求:axios发请求返回结果Promise对象 不写return的话返回值是undefined
    return mockRequests.get("/banner")
}
export const reqFloorList = () => mockRequests.get("/floor")
//获取搜索模块数据 地址：/api/lilst 请求方式：post 请求要带参数
/*参数的结果
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
axios中data和params的区别
data的传的是一个json数据
params是一个正常数据

*
*/
//当前这个接口（获取搜索模块的数据），给服务器传递参数，至少是一个空对象
export const reqGetSearchInfo = (params) => {
    return requests({
        url: "/list",
        method: "post",
        data: params

    })

}

//获取产品详情信息的接口 URL:/api/item/{ skuId } 请求方式:get
export const reqGoodsInfo = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        methods: 'get',
    })
}


//将产品添加到购物车中(获取跟新某一个产品的个数)
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests(
        {
            url: `/cart/addToCart/${skuId}/${skuNum}`,
            method: "post"
        }
    )

}

//获取购物车列表的接口
export const reqCartList = () => {
    return requests({
        url: '/cart/cartList',
        method: 'get'
    })
}

//删除购物产品的接口
////URL:/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteCartById = (skuId) => {
    return requests(
        {
            url: `/cart/deleteCart/${skuId}`,
            method: "delete"
        }
    )
}

//修改商品选中的状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        url: `cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

//获取验证码
export const reqGetCode = (iphone) => {
    return requests({
        url: `/user/passport/sendCode/${iphone}`,
        method: 'get'
    })
}

//注册
export const reqUserRegister = (data) => {
    return requests({
        url: '/user/passport/register',
        data,
        method: 'post'
    })
}

//登录
export const reqUserLogin = (data) => {
    return requests({
        url: '/user/passport/login',
        data,
        method: 'post'
    })
}

//获取用户信息【需要带有用户的token向服务器要用户信息】
export const reqUserInfo = () => {
    return requests({
        url: '/user/passport/auth/getUserInfo',
        method: 'get'
    })
}

//退出登录
export const reqLogout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}

//获取用户地址信息
export const reqAddressInfo = () => {
    return requests({

        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get'
    })

}

//获取商品清单
export const reqOrderInfo = () => {
    return requests({

        url: '/order/auth/trade',
        method: 'get'
    })

}

//提交订单的接口
//   /order/auth/submitOrder?tradeNo={tradeNo}  method:post
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method: 'post'
    })

}

//获取支付信息
///api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
    return requests({
        url: `payment/weixin/createNative/${orderId}`,
        method: 'get'
    })

}

//获取支付订单状态
////URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get'
    })

}

//获取个人中心的数据
//api/order/autho/{page}/{limit} get
export const reqMyOrderList = (page, limit) => {
    return requests({
            url: `/order/auth/${page}/${limit}`,
            method: 'get'
        }
    )
}
