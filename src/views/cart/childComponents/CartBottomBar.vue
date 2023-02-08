<template>
  <div class="bottom-bar">
    <div class="check-content">
        <check-button :value="isSelectAll"  class="check-button" @click.native="checkClick"></check-button>
        <span>全选</span>
    </div>
    <div class="total-price">
        合计:{{ totalPrice }}
    </div>
    <div class="calculate">
        去计算：{{ checkLength }}
    </div>
  </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue'
export default {
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            return !this.$store.state.cartList.filter(item => !item.checked).length
        }
    },
    methods:{
        checkClick(){
            if(this.isSelectAll){
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    display: flex;
    height: 40px;
    width: 100%;
    background-color: #eee;
    position: relative;
    /* z-index: 99; */
    bottom: 40px;
}

.check-content{
    display: flex;
    width: 60px;
    margin-top: 10px;
    margin-left: 10px;
}
.check-button{
    width: 20px;
    height: 20px;
}

.total-price{
    margin-top: 10px;
    margin-left: 20px;
}

.calculate{
    margin-left: 87px;
    margin-top: 10px;
    /* width: 120px;
    background: red; */
}

.check{
    border-color: red;
}
</style>