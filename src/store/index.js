import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    getters,
    state:{
        cartList:[],
        checked:true
    },
    mutations:{
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){     
            payload.checked = true     
            state.cartList.push(payload)
           
        }
    },
    actions:{
        addCart(context,payload){
            let oldProduct = null;
            for(let item of context.state.cartList){
                if(item.iid === payload.iid){
                    oldProduct = item;
                }
            }
            if(oldProduct){
                // oldProduct.count +=1
                context.commit('addCounter',oldProduct)
            }else{
                payload.count = 1
                context.commit('addToCart',payload)
            }
            
        }
    }
})

export default store