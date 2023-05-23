<template>
    <div>
        <!--        已经注册为组件了 三级联动全局组件-->
        <TypeNav></TypeNav>

        <!--        列表-->
        <ListContainer></ListContainer>

        <!--今日推荐-->
        <Recommend></Recommend>

        <!-- 商品排行 -->
        <Rank></Rank>
        <!-- 猜你喜欢 -->
        <Like></Like>

        <!--    楼层  Fllor这个租几间：自己在组件内部是没有发请求的，数据是父组件给的  -->
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>

        <!--        商品标签-->
        <Brand></Brand>

    </div>
</template>

<script>
    import ListContainer from "@/views/Home/ListContainer"
    import Recommend from "@/views/Home/Recommend"
    import Rank from "@/views/Home/Rank"
    import Like from "@/views/Home/Like"
    import Floor from "@/views/Home/Floor"
    import Brand from "@/views/Home/Brand"
    import {mapState} from "vuex"

    export default {
        name: "home",
        components: {
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
        mounted() {
            try {
                // 派发action,获取floor组件的数据
                this.$store.dispatch("getFloorList");
            } catch (e) {
                alert(e.message)
            }

        },
        computed: {
            ...mapState(
                {
                    //state是一个对象,里面存放着仓库中所有的属性
                floorList: state => state.home.floorList
            }
           // 上面的写法相当于下面数组写法
           // ['floorList']
            )
        }
    }
</script>

<style scoped>

</style>