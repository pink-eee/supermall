<template>
  <div class="detail-swiper">
    <swiper class="swiper1">
        <swiper-item class="swiper-item" v-for="(item,index) in topImages" :key="index">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from '../../../components/common/swiper'

export default {
    components:{
        Swiper,
        SwiperItem

    },
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .swiper1{
        display: fixed;
        height: 300px;
        overflow: hidden;
    }
</style>