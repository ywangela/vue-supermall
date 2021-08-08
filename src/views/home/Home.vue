<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
<!--    scroll：是自己封装的Better-Scroll-->
<!--    probeType前一定要加上冒号，不然它会把字符串3传到子组件中去！！！-->
    <scroll class="wrapper"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">

       <recommend-view :recommends="recommends"/>
       <!--    【本周流行】模块该处是一张图片-->
       <feature-view/>
       <tab-control :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                     ref="tabControl"/>
       <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
/* 管理代码 对引用的包、组件进行分类，方便日后进行查找等*/
// home首页中的子组件(views/home/childComps)
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

// 公共组件(components) 在首页、分类等其他页面都会用到的公共组件
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {itemListenerMixIn} from "@/common/mixin";
// 请求到的home首页数据
import {
  getHomeMultidata,
  getHomeGoods
} from "@/network/home";
import {debounce} from "@/common/utils";


export default {
  name: "Home",
  // 该处的注册组件的书写顺序与上面的引入顺序一致，易于查找管理
  components:{
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins:[itemListenerMixIn],
  data(){
    return {
      // result:null
      // 轮播图数据
       banners: [],
      // 推荐数据
      recommends: [],
      // 流行、新款、精选数据
      // 默认把第一页的数据请求下来，后面的第2,3..页等用户往上滑动加载的时候再请求
      goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:545, // 涉及到轮播图，暂时设定为死数据545
      // 保存离开时的位置
      saveY: 0,



    }
  },
  // 什么时候请求数据 - 当组件被创建好的时候
  created() {
    // 1. 请求多个数据  .then（）拿到请求过后的数据
    this.getHomeMultidata()

    // 2. 请求流行、新款、精选数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')



  },
  mounted(){
    // 1. 图片加载完成的事件监听
    // 传入的是函数，不要在函数后面加上()，否则就变成调用函数了，第一个参数就变成参数的返回值了
    // let newRefresh= debounce(this.$refs.scroll.refresh,100)
    // // 监听GoodsListItem中的图片加载完成  知识点：事件总线
    // // 将该方法放置于mounted函数中，确保调用scroll组件对象中的方法时，scroll组件被创建
    //
    // // 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   newRefresh();
    //   }
    //   this.$bus.$on('itemImgLoad',this.itemImgListener)

    // this.$bus.$on('itemImgLoad', () => {
    //   // console.log('---');
    //   // 执行频率过高
    //   // scroll组件对象中的scroll属性
    //   //  判断scroll组件对象有没有被创建出来，否则可能会被报错
    //   // this.$refs.scroll && this.$refs.scroll.scroll.refresh()
    //   refresh();
    // });
   // 2.过去tabControl的offsetTop
  //  所有的组件都有一个属性$el:用于获取组件中的元素
  //  this.$refs.tabControl.$el.offsetTop 获取的高度值不准确，可能不包含图片
  //  因为图片加载比较慢，组件挂载完，图片还没有加载完成，所以获取的高度可能并不包含图片高度
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  activated() {
  // console.log('activated');
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.scroll.refresh();
    },
  // 离开页面 deactivated()必须与<keep-alive>搭配使用
  deactivated() {
    // console.log('deactivated');
    this.saveY = this.$refs.scroll.scroll.y;
  //  当图片加载完成，进行刷新操作，离开home首页后，取消该事件
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    /*
    * 事件监听相关的方法
    * */

    tabClick(index){
      switch (index) {
        case 0:
          this.currentType =  'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'

      }

    },
    // 回到顶部
    backClick(){
      // 通过这种$refs方式（组件）拿到scroll组件对象，然后可以拿到里面的scroll（data中的数据）
      // scrollTop()的第三个参数是毫秒，表示在x毫秒内达到我们设置的位置
      this.$refs.scroll.scroll.scrollTo(0,0,500);
    },

    contentScroll(position){
      // position.y是负值！！！

      // if(-position.y < 500){
      //   this.isShowBackTop = false;
      // }else{
      //   this.isShowBackTop = true;
      // }

    //  1.判断backTop回到顶部是否显示 简写
      this.isShowBackTop = -position.y > 1000;

    //  2. 决定tabControl是否吸顶（position:fixed)
    //   this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log('shagnla');
      this.getHomeGoods(this.currentType);
      // 图片是异步加载出来的 在图片加载完之后，我们需要手动刷新一下
      this.$refs.scroll.scroll.refresh(); //计算最新的可滚动高度

    },
    /*
    * 网络请求相关的方法
    * */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res);
        // 用data中的result变量保存请求过后的数据 否则函数执行完，res会被回收
        // this.result = res;
        // 一般请求过来的数据不会在这里直接使用  需要用变量保存起来
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        // 此时获取到的是pop中的第1页的30条数据内容
        // 将数据放到对应type下的列表数组中
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;
        // this.goods[type].page = page;
        // console.log(res);
        //拿到Scroll组件对象，调用其中的方法  完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;/*100%视口*/
  position: relative;
}
.home-nav {
  background-color:var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* 在Better-Scroll中无效*/
/*.tab-control {*/
/*  position: sticky;*/
/*  top: 44px;*/
/*  z-index:10;*/
/*}*/

.wrapper {
  overflow: hidden;
  /* 可以通过定位的方式来决定wrapper的高度！！！ 动态决定*/
  /* 还有一种方式，通过css3中的calc()计算高度*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}


</style>
