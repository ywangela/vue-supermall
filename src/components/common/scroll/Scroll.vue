<template>
<!--  ref属性：明确地拿到具体的组件-->
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from "better-scroll"
export default {
name: "scroll",
  data(){
  return {
    scroll: null
  }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  methods:{
  finishPullUp(){
    this.scroll.finishPullUp();
  },
    refresh(){
      // console.log('----');
      this.scroll.refresh();
    }
  },
  mounted(){
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 因为在scorll组件中有用到tab-control
      // tab-control中有用到一个点击方法（类似div这样的元素，除button？？？）
      // 所以要想让这个组件中的点击事件生效的话，必须设置click:true!!!
      // 限制div等html元素的点击事，对button是不影响的
      click:true,
      // 这个是公共组件，在这里设置不合适
      // 有些用到这个组件的地方，需要实时监听；有的不需要，这个会影响性能！
      // 所以，probeType的值不要设置死数据，设置变量传入!!! 父传子
      probeType:this.probeType,
      // 不要固定死！！！
      pullUpLoad:this.pullUpLoad
    })

// console.log(this.probeType);
  //   2. 监听滚动的位置 只有上面设置了probeType，才能监听到实时滚动位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', position => {
        // console.log(position);
        //  判断srcoll有没有被创建出来！！！
        //  如果还没有创建出来就执行方法，会报错，说找不到xx方法
        this.scroll  &&  this.$emit('scroll',position);//发出position
      })
    }



  //  3. 监听scroll滚动到底部
    if(this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          // console.log('滚动到底部');
          this.$emit('pullingUp');
        })
    }


  }
}
</script>

<style scoped>

</style>
