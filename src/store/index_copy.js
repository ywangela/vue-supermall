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
   addCart(state,payload){
      // 1) 判断新添加商品以前是否存在  payload 新添加的商品 对比iid
     let oldProduct = null;
     for(let i of state.cartList){
       if(i.iid === payload.iid){ // 如果新添加的商品之前已经存在
           // oldProduct = payload;   // 我就不用再添加（以免造成商品重复）
            oldProduct = i;           // 但是在数量要加1
       }
     }

     //
     //  2）如果此时oldProduct为null，说明payload是一个新商品
     //  如果oldProduct不为null，说明商品之前已经存在，数量加1
     if(oldProduct){
       oldProduct.count += 1;
     }else{
       payload.count = 1;
       payload.checked = true;
       state.cartList.push(payload);
     }
   },

  },
  actions:{


  }
})

export default store

