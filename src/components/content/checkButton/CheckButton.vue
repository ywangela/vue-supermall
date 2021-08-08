<template>
  <div class="check-button" :class="{checkActive:isChecked}">
    <img src="@/assets/img/common/checkButtonTick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  },
  methods:{

  }

}
</script>

<style scoped>
 .check-button {
   width: 18px;
   height: 18px;
   border:1px solid #999999;
   border-radius: 50%;
   display: table-cell;
   text-align: center;
   position: relative;
   /*padding-top: 2px;*/
 }

 .check-button img {
   width: 12px;
   height: 12px;
   position: absolute;
   top: 2px;
   left: 2px;
 }

 .checkActive {
   border-color: orangered;
   background-color: orangered;
 }
</style>
