import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixIn = {
  // components,methods等选项都可以混入
  data(){
    return {
      itemImgListener:null
    }
  },
    mounted(){
      // 防抖操作
      let newRefresh = debounce(this.$refs.scroll.refresh,100);

      this.itemImgListener = () => {
        newRefresh()
      }
      this.$bus.$on('itemImgLoad',this.itemImgListener)
      // console.log('我是混入中的内容');
    }

}

export const backTopMixIn = {
  components:{
    BackTop
  },
 data(){
   return {
     isShowBackTop:false
   }
 },
  methods:{
    backClick(){
      // 通过这种$refs方式（组件）拿到scroll组件对象，然后可以拿到里面的scroll（data中的数据）
      // scrollTop()的第三个参数是毫秒，表示在x毫秒内达到我们设置的位置
      this.$refs.scroll.scroll.scrollTo(0,0,500);
    },
  }
}
