<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
    <!-- <div>{{goods}}</div> -->

  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
    .goods{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>