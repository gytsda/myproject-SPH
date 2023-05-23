<template>
    <div id="app">
        <!--        头部-->
        <Header></Header>

        <!--        路由组出口的地方-->
        <router-view></router-view>


        <!--        底部
        在Home、Search显示，在登录、注册隐藏
        -->
        <Footer v-show="$route.meta.show"></Footer>


    </div>
</template>

<script>

    import Header from './components/Header'
    import Footer from './components/Footer'

    export default {
        name: 'App',
        components: {
            Header,
            Footer
        },
        mounted() {
            //派发action并且获取商品分类的三级列表的数据

            //    通知Vuex发请求,获取数据，存储于仓库中
            this.$store.dispatch("categoryList")
        }
    }
</script>

<style>

</style>
