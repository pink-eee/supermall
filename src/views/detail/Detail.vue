<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <!-- <detail-goods-info :detailInfo="detailInfo"></detail-goods-info> -->
    <!-- @imageLoad="imageLoad" -->
    <detail-params-info :param-info="paramInfo" ref="params"></detail-params-info>
    <!-- <detail-image-info :detail-info="detailInfo"></detail-image-info> -->
    <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
    <goods-list :goods="recommends" ref="recommend"></goods-list>
    <!-- <div>{{this.$store.state.cartList.length }}</div> -->
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar.vue'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
// import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParamsInfo from './childComponents/DetailParamInfo.vue'
// import DetailImageInfo from './childComponents/DetailImageInfo.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
import DetailBottomBar from './childComponents/DetailBottomBar.vue'

import GoodsList from '../../components/content/goods/GoodsList.vue'
import BackTop from '../../components/content/backTop/BackTop.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'

import store from './../../store/index'

export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        // DetailGoodsInfo
        DetailParamsInfo,
        // DetailImageInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop
    },
    data(){
    return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopY:[0,1000,2000],
        isShowBackTop:false,
    }
},

    created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
        const data = res.result;
        console.log(res);
        this.topImages = res.result.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo,data.colums,data.shopInfo.services);
        this.shop = new Shop(data.shopInfo);
        // this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
        if (data.rate.list) {
		        this.commentInfo = data.rate.list[0];
	        }
    })   
    getRecommend().then(res =>{
        console.log(res);
        this.recommends = res.data.list
    }) 
},
// updated(){
//     this.$refs.scroll.refresh();
//     this.$refs.scroll.finishPullUP
// },
    methods:{
        titleClick(index){
            console.log(index);
            this.$refs.scroll.scroll.scrollTo(0,-this.themeTopY[index],100)
        }  ,
        contentScroll(position){
            const positionY = -position.y;
            const length = this.themeTopY.length           
             for(let i = 0;i < this.themeTopY.length - 1; i++){
                if(this.currentIndex !== i && ((positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1] ) )){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }
            this.isShowBackTop = -position.y > 600
        },
        backClick(){
      // this.$refs.scroll && this.$refs.scroll.scrollTo && 
      this.$refs.scroll.scroll.scrollTo(0,0,500)
      console.log(this.$refs.scroll.message);
    },
    addCart(){
        console.log('666');
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
    }
    // imageLoad(){
    //     this.$refs.scroll.refresh
    // }
    },
    updated(){
        this.themeTopY = []
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE)
        console.log(this.themeTopY);
    }



}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
}

.content{
    height: calc(100% - 49px - 46px);
    background-color: white;
    overflow: hidden;

}
</style>