<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" 
      @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>

   <scroll class="content" ref="scroll" 
    :probe-type="3" @scroll="contentScroll" 
     :pullUpLoad="true"   @pullingUp="loadMore">      
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"  
      @tabClick="tabClick" ref="tabControl2" v-show="!isTabFixed"></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list> 
   </scroll>

   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
      
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import FeatureView from './childComps/FeatureView.vue'
import RecommendView from './childComps/RecommendView.vue'

import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'


import {getHomeMultidata,getHomeGoods} from '../../network/home.js'
import {debounce} from "../../common/utils.js"




export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      currentType:'pop',
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,50)
    
    // this.$bus.$on('itemImgLoad',() => {
    //   this.$refs.scroll && this.$refs.scroll.refresh()
    //   console.log('---');
    // })
  },
 
  activated(){
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,1)
      this.$refs.scroll.refresh()
      console.log('222');
    },
  deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
    },
  

  methods:{
    tabClick(index){
      console.log(index)
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      // this.$refs.scroll && this.$refs.scroll.scrollTo && 
      this.$refs.scroll.scroll.scrollTo(0,0,500)
      console.log(this.$refs.scroll.message);
    },
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = -position.y > 600
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore(){
      console.log('aaa');
      this.getHomeGoods(this.currentType)
      this.$refs.scroll && this.$refs.scroll.refresh()
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },


    getHomeMultidata(){
      getHomeMultidata().then(res =>{
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;

    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
    getHomeGoods(type,page).then(res =>{
      console.log(res)
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
      this.$refs.scroll.finishPullUp()
    })
  }
  }
}
</script>

<style scoped>
  #home{
    /* padding-bottom: 1000px; */
    height: 100vh;
    background-color: white;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* position:sticky;
    top:0px;
    z-index: 999; */
  }

  .tab-control {
    position:relative;
    /* z-index: 9; */
  }

  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    background-color: white;
    /* margin-top: 10px; */
  }

  /* .fixed{
    position :fixed;
    left: 0px;
    right: 0px;
    top: 44px;
  } */
</style>