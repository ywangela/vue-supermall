import Toast from "@/components/common/toast/Toast";

const obj = {}
// install执行的时候，默认会传过来一个vue参数（还是要手动传参的）
obj.install = function(Vue){
  // Toast中是一个模板
  // 这种方式不行：通过这个将其加入一个body元素
  // 因为这时候元素可能还没有挂载呢，拿不到$el值
  // document.body.appendChild(Toast.$el);

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastContrustor();

  //3. 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  // console.log('toast安装',Vue);
  // toast对象最好是Toast组件
  Vue.prototype.$toast = toast

}
export default obj
