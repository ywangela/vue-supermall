<template>
<div class="bottom-bar">
<!--  全选区域-->
  <div class="checkArea left">
   <check-button :class="{isAllChecked:allChecked}"
                 @click.native="allCheckedClick"/>
    <div>&nbsp;全选</div>
  </div>
  <div class="right">
<!--   计算选中状态下的情况-->
  <!--    商品总价格-->
  <div class="countArea">
    <span class="text1">已选{{totalNum}}件,</span>
    <span class="text2" >合计:￥{{totalPrice}}&nbsp;</span>
  </div>
<!--  商品总数-->
  <div class="payArea">
    去结算
  </div>
  </div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CaerBottomBar",
  components:{
    CheckButton
  },
  data(){
    return {
      isAllChecked: false,
    }
  },
  computed:{
    // 计算选中状态下的情况
    totalPrice(){
      let totalPrice = 0;
      let carList = this.$store.state.cartList;
      for(let i=0;i<carList.length;i++){
        if(carList[i].checked){
          totalPrice += carList[i].price * carList[i].count;
        }
      }
      // 保留2位小数
      return totalPrice.toFixed(2)
    },
    totalNum(){
      let totalNum = 0;
      let carList = this.$store.state.cartList;
      for(let i=0;i<carList.length;i++){
        if(carList[i].checked){
          totalNum += carList[i].count;
        }
      }
      return totalNum
    },
    allChecked(){
      let carList = this.$store.state.cartList
      for(let i=0;i<carList.length;i++){
        if(carList[i].checked !== true){
          this.isAllChecked =false;
          break;
        }else{
          this.isAllChecked = true;
        }
      }
      // console.log(this.isAllChecked);
      return this.isAllChecked
    }
  },
  methods:{
    allCheckedClick(){
      this.isAllChecked = !this.isAllChecked
      let carList = this.$store.state.cartList
      if(this.isAllChecked){
      for(let i=0;i<carList.length;i++) {
        carList[i].checked = true
      }
      }else{
        for(let i=0;i<carList.length;i++) {
          carList[i].checked = false
        }
      }

    },

  }
}
</script>

<style scoped>
 .bottom-bar {
   background-color: skyblue;
   height: 40px;
   width: 100%;
   display: flex;
   justify-content: space-between;
   font-size: 13px;
   color: #999999;
 }
 .checkArea {
   width: 70px;
   height: 40px;
   display: flex;
   align-items: center;
   padding-left: 7px;

 }
 .isAllChecked {
   background-color: orangered;
 }

 .right {
   display: flex;
 }

 .countArea {
  line-height: 40px;
   width: 150px;
 }




 .payArea {
   display: inline-block;
   line-height: 40px;
   width: 80px;
   background-color: #e0620d;
   color: white;
   border-radius: 30px;
   text-align: center;


 }


</style>
