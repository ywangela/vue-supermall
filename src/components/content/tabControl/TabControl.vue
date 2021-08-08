<template>
<div class="tab-control">
<!--  只是文字不一样，就不用搞插槽了；如果搞插槽会更麻烦一点-->
  <div class="tab-control-item" v-for="(item,index) in titles"
  :class="{active:index === currentIndex}"
  @click="itemClick(index)">
    <span>{{item}}</span>
  </div>
</div>

</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
    //  将内部itemClick点击事件传出去 子传父-自定义事件
      this.$emit('tabClick',index);

    }
  }

}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height:40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex:1; /*表示平均*/
}
.tab-control-item  span{
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}

.active span{
  border-bottom:3px solid var(--color-tint);
}
</style>
