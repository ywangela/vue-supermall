import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";

// 因为导出是default，所以在这里可以随意命名
import toast from '@/components/common/toast'

Vue.config.productionTip = false
// new Vue({})实例可以作为事件总线  加载图片
Vue.prototype.$bus = new Vue({})

// 安装toast插件
// 只要用了这个方法，就会内部调用toast插件中的install方法进行安装
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
