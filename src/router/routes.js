/*路由配置信息*/
//引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/MyOrder'
import GroupOrder from '@/views/Center/GroupOrder'

export default [
    {
        //重定向，当访问/，立马让他定向首页
        path: "*",
        redirect: "/home"
    },

    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {show: true}


    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: Search,
        meta: {show: true}

    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {show: false}

    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {show: false}
    },
    {
        path: '/detail/:skuId',
        name: 'detail',
        component: Detail,
        meta: {show: false}
    },
    {
        path: '/addcartsuccess',
        name: 'AddCartSuccess',
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {show: true}
    },
    ,
    {
        path: '/Trade',
        name: 'Trade',
        component: Trade,
        meta: {show: true},
        //路由独享守卫
        beforeEnter:(to, from, next) => {
            //从交易页面，必须是从购物车而来
            if (from.path == '/shopcart') {
                next();
            } else {
                //其他的路由组件而来
                next(false);
            }
        }
    },
    {
        path: '/pay',
        name: 'Pay',
        component: Pay,
        meta: {show: false},
        beforeEnter:(to, from, next)=> {
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/paysuccess',
        name: 'PaySuccess',
        component: PaySuccess,
        meta: {show: false}
    },
    {
        path: '/center',
        name: 'Center',
        component: Center,
        meta: {show: false},
        //耳机路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                //    重定向
                path: '/center',
                redirect: '/center/myorder',

            }

        ]
    }
]