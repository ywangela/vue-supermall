<template>
<div id="detail">
  <detail-nav-bar
    class="detail-nav"
    @titleClick="titleClick"
    ref="nav"/>
<!--  把要滚动的区域放进scorll中-->
  <scroll class="wrapper"
          ref="scroll"
          :probe-type="3"
           @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info
      :detail-info="detailInfo"
       @imgLoad="imgLoad" />
    <detail-param-info :param-info="paramInfo" ref="params"/>
     <detail-comment-info :comment-info="commentInfo"  ref="comment"/>
<!--    给子组件的goods传递一个值，这个值有要求，要求是Array类型的-->
    <goods-list :goods="recommends" ref="recommend"/>
  </scroll>
  <detail-bottom-bar @addToCart="addToCart"/>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>

</div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";


import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";



// 网络请求数据
import {getDetails,getRecommend,Goods,Shop,GoodsParam} from "@/network/detail";
import {debounce} from "@/common/utils";
import {itemListenerMixIn,backTopMixIn} from "@/common/mixin";



export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,

  },
  mixins:[itemListenerMixIn,backTopMixIn],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      // 点击标题，跳到某个位置
      // themeTopYs:[0,1000,2000,3000]
      // 获取对应组件的offsetTop值
      themeTopYs:[],
      currentIndex:0

    }
  },
  created() {
    // 1. 保存传入的iid值
    // 因为App.vue中包裹了<keep-alive>,
    // 所以created()函数只执行一次，iid值始终就是我们最初赋的值
    // 你点击什么图片都是最初点击的图片
    this.iid = this.$route.params.iid;
    // console.log(this.$route.params.iid);
    // console.log(this.iid);

  //  2.根据iid请求详情数据
    getDetails(this.iid).then(res => {
      // console.log(res);
    //  数据抽离
       const resultData = res.data.result
    //  1) 获取顶部的图片轮播数据
      this.topImages = resultData.itemInfo.topImages;
    //   console.log(res.data.result.itemInfo.topImages)
    //  2) 获取商品基本信息
      this.goods = new Goods(resultData.itemInfo,resultData.columns,resultData.shopInfo.services);
    //  3) 商品店铺信息
      this.shop = new Shop(resultData.shopInfo);
      // console.log(resultData.shopInfo);
    //  4） 获取商品详细信息
      this.detailInfo =resultData.detailInfo;
    //  5） 获取商品参数信息
      this.paramInfo =new  GoodsParam(resultData.itemParams.info,resultData.itemParams.rule)
    // 6）获取评论信息
    //   有的商品没有评论，需要做一个判断
      if(resultData.rate.cRate !== 0){
        this.commentInfo = resultData.rate.list[0];
      }
    //  第二次获取：offsetTop值不对
    //  原因：图片没有完全加载出来，导致图片没有计算在内
    // 根据最新的数据，对应的DOM是已经被渲染出来，
    // 但是，图片依然是没有加载完的（目前获取到的offsetTop不包含图片）
    // this.$nextTick( () => {
    //
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // })



    })

  //  3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      // console.log(res.data.data.list);
      this.recommends = res.data.data.list;
    })


  },
  mounted(){
    // 防抖操作
    // let newRefresh = debounce(this.$refs.scroll.refresh,100);
    //
    // this.itemImgListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad',this.itemImgListener)

    //第一次获取：offsetTop值不对
    // 原因：this.$refs.params.$el 压根没有渲染
    // this.themeTopYs.push(0);
    // // this.$refs.params 获取到的是组件对象
    // // this.$refs.params.$el 获取到的是组件对象指向的DOM元素（根元素）
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // // 显示params、comment值为undefined，表示对应的DOM元素没有
    // // 原因：因为我们在组件中使用了v-if="Object.keys(paramInfo).length !== 0
    // // 因为数据在created()中请求的，而且还是异步请求
    // // 所以到mounted的时候，数据还不一定请求到呢
    // // 那params组件中的元素就不会进行渲染，也就拿不到$el值了
    // console.log(this.themeTopYs);

  //   所以，我们必须确保要拿到数据！！！（因为做了判断）
  //  确保拿到数据，利用是有这个DOM元素的，但是还没有拿到
  // 渲染需要一定时间


  },
  // 因为在App.vue中的<keep-alive>中exclude了Detail组件，所以不能进行缓存
  // 因此，也不能使用activated和deactivated
  // 所以，我们可以使用destroyed，它无论如何都会被调用的
  // deactivated() {
  //
  // },
  updated(){
    // 一定要有这个
    // 第一次没有数据的时候是4个值，有数据的时候又会调用这个updated，又将4个值存进来
    this.themeTopYs = []
    // 这里能确保拿到数据,但是调用会非常频繁
    // 因为updated只要组件一有变化就会进行更新
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);

  },
  destroyed() {
    // 离开该页面时，取消该函数  在其他地方就不能调用了
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    // 添加到购物车
    addToCart(){
      // console.log('click in father');
    //  1）获取购物车中需要展示的商品信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc= this.goods.desc;
      product.price= this.goods.price;
      product.iid = this.iid; //商品的唯一标识，一定要拿到！！！

      // 2）将商品添加到购物车中，用Vuex存储商品数据
      // this.$store.cartList.push(product);  // 最好不要这样做
      // 通过mutations修改
      // 代码重构

      this.$store.dispatch('addCart', product)
      .then(res => {
        // console.log(res);
        this.$toast.show(res);
        console.log(this.$toast);
      })
    },

    // 监听图片加载
    imgLoad(){
      this.$refs.scroll.refresh();

      // this.themeTopYs = []
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

    },
    titleClick(index){
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){

      //  1.判断backTop回到顶部是否显示 简写
      this.isShowBackTop = -position.y > 1000;

      // console.log(position);
    //  2. 标题与内容的联动
    //  1) 获取y值（注意y值是负值）
      const positionY = -position.y
    //  2) 将positionY与主题中的值作对比
    //  主题中的值已经通过上个操作获取到themeTopYs[]
    //  [0, 6108, 6890, 7106]
    //  如果positionY介于0~6108之间，index=0；
    //  如果positionY介于6108~6890之间，index=1；
    //  如果positionY介于6890~7106之间，index=2；


      //  如果positionY大于7106，index=3
   for(let i=0; i<this.themeTopYs.length; i++){
         // 这种方法是正确的，但是打印特别频繁
         // if(i<this.themeTopYs.length-1 && positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
         //  || (i === this.themeTopYs.length-1 && positionY >= this.themeTopYs[i])){
         //    // console.log(i);
         //   this.currentIndex = i;
         // }

   //   在if判断语句中多加一个判断this.currentIndex !== i 就不会打印频繁了
     if(this.currentIndex !== i && (i<this.themeTopYs.length-1 && positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
       || (i === this.themeTopYs.length-1 && positionY >= this.themeTopYs[i]))){
        // console.log(i);
       this.currentIndex = i; //作用：主要作为判断条件
       // console.log(i);
       this.$refs.nav.currentIndex = this.currentIndex;
     }
   }
    }

  }
}


</script>

<style scoped>
#detail {
  position: relative;
  z-index:10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index:9;
  background-color:white;
}
.wrapper {
  height:calc(100% - 44px - 58px);

}


</style>
