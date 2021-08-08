<template>
 <div class="tab-bar-item" @click="itemClick()">
   <div v-if="!isActive"><slot  name="item-icon"></slot></div>
   <div v-else><slot  name="item-icon-active"></slot></div>
   <div :class="{active:isActive}"><slot name="item-text"></slot></div>
 </div>

</template>

<script>
export default {
  name: "TabBarItem",
  // 让父组件告诉你，你点击了哪个item
  props:{
    path:String
  },
  data() {
    return {
      // isActive:true,

    }
  },
  computed:{
    isActive(){
      // $route哪个路由活跃，这个就是哪个item
      // this.$route.path 拿到的是活跃的路由的path
      // indexOf()里的this.path是父组件通过props传过来的path  ？？？
      // indexOf()如果返回-1的话，说明没有找到该字符串
      return this.$route.path.indexOf(this.path) !== -1
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  /*line-height: 49px;*/
  font-size: 14px;
  padding-top: 5px;

}

.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 1px;
}

.active {
  color: #e0620d;
}

</style>
