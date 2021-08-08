<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-text-wrap">
      <div class="text-top-style"></div>
        <div class="desc info-text-desc">{{detailInfo.desc}}</div>
        <div class="text-bot-style"></div>
    </div>
    <div class="img-list-wrap"
         v-for="item in detailInfo.detailImage">
<!--      有的只有key，没有图片-->
<!--      所以当没有图片的时候，我们就不显示key值-->
      <div v-if="item.hasOwnProperty('item') === true" class="desc">{{item.key}}</div>
      <div  v-for="(item,index) in item.list" :key="index">
        <img :src="item" alt="" class="img" @load="imgLoad">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "DetailGoodsInfo",
  data(){
    return {
      counter:0,
      imagesLength:0
    }
  },
  props:{
    detailInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imgLoad(){
      // 判断 当所有的图片都加载完，那么进行一次回调即可  降低性能
      // 否则，有多少张图片，这个函数就会被调用多少次，影响性能
      // 有这个判断的话，可能还会出现滑动问题（图片未完全加载出来）
      // 去掉判断的话，100%不会出现滑动问题
      if(++this.counter === this.imagesLength){
        this.$emit('imgLoad');
      }

    }
  },
  watch:{
    detailInfo(){
    //  实时监听，获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
 .info-text-wrap {
   position: relative;
 }
 .info-text-wrap .text-top-style {
   width: 60px;
   height: 1px;
   background-color: #333;
   margin-left: 4px;
 }
 .info-text-wrap .text-top-style::before {
   position: absolute;
   left: 4px;
   top: -2.5px;
   display: block;
   content: '';
   width: 5px;
   height: 5px;
   background-color: #333;
 }

 .info-text-wrap .text-bot-style {
   width: 60px;
   height: 1px;
   background-color: #333;
   position: absolute;
   right: 4px;
   bottom: 0;
 }
 .info-text-wrap .text-bot-style::after {
   position: absolute;
   right: 0;
   top: -2.5px;
   display: block;
   content: '';
   width: 5px;
   height: 5px;
   background-color: #333;
 }

 .info-text-wrap .info-text-wrap {
   padding: 10px 4px;
 }

 .desc {
   font-size: 14px;
   padding-bottom: 6px;
   line-height: 20px;
   margin: 4px 0;
   text-indent: 10px;
 }
 .img {
   width: 100%;
 }
</style>
