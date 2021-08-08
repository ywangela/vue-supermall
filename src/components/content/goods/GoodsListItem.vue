<template>
<div class="goods-item" @click="itemClick">
<!--  组件复用！！！ home页的商品展示，商品详情页的推荐-->
<!--  因为图片取的位置不一样，所以在computed中设置showImage来决定展示哪一个-->
  <img
    :src="showImage"
    alt=""
    @load="imageLoad">
  <div class="goods-info">
  <p>{{goodsItem.title}}</p>
    <span class="price">￥{{goodsItem.price}}</span>
<!--    收藏-->&nbsp;
    <span class="collect">已有{{goodsItem.cfav}}人收藏</span>
  </div>
</div>

</template>

<script>
export default {
name: "GoodsListItem",
  props:{
  goodsItem:{
    type:Object,
    default(){
      return {}
    }
  }
  },
  computed:{
  showImage(){
    // || 和 && 用法挺妙的
    return this.goodsItem.image || this.goodsItem.showLarge.img
  }
  },
  methods:{
  imageLoad(){
    // 复用组件
    // if(this.$route.path.indexOf('/home')){
    //   this.$bus.$emit('homeItemImgLoad');
    // }else if(this.$route.path.indexOf('/detail'))
    // this.$bus.$emit('detailItemImgLoad');
    this.$bus.$emit('itemImgLoad');
  },
    // 点击某一张图片，跳转到详情页
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;

}

.goods-item img {
  width: 100%;
  height: 270.08px;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom:5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price{
  color:var(--color-tint);
  margin-right: 20px;
}

.goods-info .collect{
  position: relative;
}

.goods-info .collect::before{
  content:'';
  position: absolute;
  left:-15px;
  top:-1px;
  width: 14px;
  height: 14px;
  /*background: url("") 0 0/14px 14px;*/
}
</style>
