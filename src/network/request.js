import axios from "axios";
export function request(config){
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })
  // 拦截器的使用
  // 请求拦截 用得不多
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   // return config    //config一定要返回
  // },err => {
  //   console.log(err);
  // })
  // // 响应拦截
  // instance.interceptors.response.use( res => {
  //   return res.data
  // },err => {
  //   console.log(err);
  // })
  // 发送真正的网络请求 返回的是一个Promise
  return instance(config)
}

