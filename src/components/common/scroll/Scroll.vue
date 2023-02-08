<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
// import  ObserveDom from 'better-scroll/observe-dom'
// BScroll.use(ObserveDom)

export default {
    data(){
        return{
            scroll:null,
            message:'hhh'
        }
    },
    props:{
        probeType:{
            type:Number,
            default(){
                return 0
            }
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType:this.probeType,
            // pullUpLoad:this.pullUpLoad,
            pullUpLoad:true,
            observeDOM:true,
            observeDOMImage:true,
            click:true
        })
        this.scroll && this.scroll.scrollTo(0,0,0)
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
            this
            console.log('hhhh');
            this.$emit('pullingUp')
        })     
    }

    },
    methods:{
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        refresh(){
            this.scroll && this.scroll.refresh()
            console.log('---');
        },
        getScrollY(){
        return this.scroll ? this.scroll.y : 0
    }
    }
    
}
</script>

<style>

</style>
