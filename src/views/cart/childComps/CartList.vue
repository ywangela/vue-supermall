<template>
  <div class="cart-list">
  <scroll class="wrapper" ref="scroll" >
   <cart-list-item v-for="(item,index) in cartList"
                    :product="item"
                    :key="index"/>
  </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  components:{
    Scroll,
    CartListItem
  },
  data(){
    return {
      cartList: this.$store.state.cartList
    }
  },
//  因为用<keep-alive>做了缓存，所以需要在activated中刷新
  activated() {
    // console.log('---');
    this.$refs.scroll.refresh()
  }


}
</script>

<style scoped>
 .cart-list {
   height: calc(100% - 44px - 49px - 40px);
   background-color: rgb(246,246,246);

 }
 .wrapper {
   height: 100%;
   overflow: hidden;
 }

</style>
