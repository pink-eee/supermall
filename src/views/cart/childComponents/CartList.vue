<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <child-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></child-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue';

import ChildListItem from './ChildListItem.vue'

import { mapGetters } from 'vuex';

export default {
    components:{
        Scroll,
        ChildListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        // console.log('000');
        this.$refs.scroll.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px);
   
}

.content{
    height: 100%;
    overflow: hidden;
    background: white;
}
</style>