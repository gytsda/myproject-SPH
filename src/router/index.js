import Vue from 'vue';
import VueRouter from "vue-router";


import routes from './routes'

//引入store
import store from '@/store'

//使用路由插件
Vue.use(VueRouter);
//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};

let router = new VueRouter(
    {
        mode: 'history',
        //    配置路由
        routes,
        //滚动行为
        scrollBehavior(to, from, savePosition) {
            //返回的这个y=0，代表滚动条在最上方
            return {y: 0}
        }

    })

//全局首位之前置守卫(再路由跳转之前进行判断)
//注意下面参数的位置不能改变位置
router.beforeEach(async (to, from, next) => {
//to：可以获取到你要跳转到那个路由信息     目的地
//    from：可以获取到你从哪个路由来的信息
//    next ：放行函数   next()放行
//    next(path)   放行到指定路由
//     next();
//用户登录了，才会有token，未登录一定不会有token

    let token = store.state.user.token;
//    用户信息
    let name = store.state.user.userInfo.name;
//    用户已经登录了
    if (token) {
        //    用户登录了还想去login 休想
        if (to.path == '/login' || to.path == '/register') {

            next('/home');
        } else {
            //    登录了，但是去的不是login【有可能去home|search|detail|shopcart】
            //    如果用户名已有
            if (name) {
                next();
            } else {
                try {
                    //    没有用户信息了,派发action让仓库存储用户信息再跳转
                    await store.dispatch('getUserInfo');
                    next();
                } catch (e) {
                    //走到这里意味着token失效 获取不到用户的信息
                    //    清除token
                    store.dispatch('UserLogout');
                    next('/login')
                }
            }

        }
    } else {
        //未登录  暂时没处理  将来回来再处理
        //    未登录去上面这些路由----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1) {
            //把未登录的时候想去没去的信息，存储再地址栏中【路由跳转的query参数】
            next('/login?redirect='+toPath);
        }else{
            //    去的不是上面的这些路由(/home|/search|shopCart)---放行
            next();
        }

    }
})

export default router;