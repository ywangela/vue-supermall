<template>
<div class="cart">
  <!--  购物车导航-->
  <nav-bar class="nav-bar">
    <div slot="center">
      <span class="cart-text">购物车</span>
      <span class="cart-num">({{$store.state.cartList.length}})</span>
    </div>
  </nav-bar>
  <!--  购物车商品列表-->
  <cart-list />
  <!--  底部汇总-->
  <cart-bottom-bar/>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar

  }
}
</script>

<style scoped>
 .cart {
   height: 100vh;
 }
 .nav-bar {
   background-color: var(--color-tint);
   color: #fff;
   font-weight: 300;
   font-size: 18px;
   position: relative;
   z-index:9;
 }
</style>
