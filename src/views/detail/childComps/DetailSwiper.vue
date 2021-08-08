<template>

  <swiper class="detail-swiper">
    <swiper-item  v-for="item in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>

</template>

<script>
/*用index.js将轮播图相关2个文件统一导出*/
import {Swiper, SwiperItem} from '@/components/common/swiper'
export default {
name: "DetailSwiper",
  props:{
  topImages:{
    type:Array,
    default(){
      return []
    }
  }
  },
  components:{
    Swiper,
    SwiperItem

  }

}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
