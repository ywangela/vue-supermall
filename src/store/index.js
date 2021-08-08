import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
   //  添加很多商品 — product对象
   cartList:[]
  },
  //
  mutations:{
    addCounter(state,payload){
      payload.count += 1;
    },
    addToShopCart(state,payload){

      payload.checked = true;
      state.cartList.push(payload);
    }

  },
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        // 1.查找之前是否已经有该商品
        let oldProduct = null;
        for(let i of context.state.cartList){
          if(i.iid === payload.iid){
            // oldProduct = payload;
            oldProduct = i;
          }
        }

        if(oldProduct){
          context.commit('addCounter',oldProduct)
          resolve('当前的商品数量+1')
        }else{
          payload.count = 1;
          context.commit('addToShopCart',payload);
          resolve('添加了新的商品')
        }

      })

    },

  }
})

export default store

