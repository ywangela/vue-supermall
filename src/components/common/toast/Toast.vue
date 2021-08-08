<template>
<div class="toast"v-show="isShow">
  {{message}}
</div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    // 如果调用函数的时候不想传参，可以设置函数的时候给它一个默认值
    show(message,duration = 2000){
        this.isShow = true;
        this.message = message;
    //  停留一段时间后，toast消失
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
 .toast {
   position: fixed;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);

   z-index: 999;

   padding: 15px 30px;
   background-color: rgba(0,0,0,.7);
   color: white;
 }
</style>
