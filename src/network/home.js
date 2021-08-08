import {request} from "@/network/request";

// 获取首页中的多个url请求数据

// 轮播图banners数据、推荐recommends数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

// 获取流行、新款、精选中的数据
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
