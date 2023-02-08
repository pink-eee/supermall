<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
      <cart-list></cart-list>
      <cart-bottom-bar></cart-bottom-bar>

    
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CartList from './childComponents/CartList.vue';
import CartBottomBar from './childComponents/CartBottomBar.vue'
import { mapGetters } from 'vuex';
import Scroll from '../../components/common/scroll/Scroll.vue';

export default {
  components: { 
    NavBar,
    CartList,
    CartBottomBar
    // Scroll 
  },
  computed:{
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
.cart{
  position: absolute;
    /* z-index: 9; */
    background-color: white;
    height: 100vh;
    width: 100%;
}
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
  }

  .content{
    height: calc(100% - 44px - 49px);
    /* height: 100vh; */
    background: white;
    overflow: hidden;
}
</style>