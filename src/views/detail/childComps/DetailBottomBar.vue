<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"><img src="@/assets/img/detail/service_color.svg" alt=""></i>
        <span class="text" style="color: #e0620d;">客服</span>
      </div>
    <div>
      <i class="icon shop"><img src="@/assets/img/detail/shopsvg.svg" alt=""></i>
      <span class="text">店铺</span>
    </div>
    <div>
      <i class="icon select"><img src="@/assets/img/detail/select.svg" alt=""></i>
      <span class="text">收藏</span>
    </div>
    </div>

    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
<!--    <sport-ball class="sport-ball" ref="ball"></sport-ball>-->

</template>

<script>
export default {
  name: "DetailBottomBar",
  methods:{
    addToCart(){
      // console.log('click');
      this.$emit('addToCart');
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 58px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;


  display:flex;
  text-align:center;
  background-color:#fff;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item>div {
  flex:1;
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  /*background: url('@/assets/img/detail/detail_bottom.png') 0 0/100%;!*什么意思？*!*/
}
.bar-left .icon img{
  width: 20px;
  height: 20px;
}


.bar-left .service {
  background-position: 0 -54px;
  /* 第一个0表示背景颜色：rgba(0,0,0,0)*/
  color:#e0620d;


}

.bar-left .shop {
  background-position: 0 -98px;
}


.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ea9518;
  color: white;

}

.bar-right .buy {
  background-color: #e0620d;
}

/*.sport-ball {*/
/*  position: absolute;*/
/*  left: 225px;*/
/*  bottom: 20px;*/
/*}*/

</style>
