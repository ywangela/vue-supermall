 import {request} from "@/network/request";

 export function getDetails(iid){
   return request({
     url:'/detail',
     params:{
      iid
     }
   })
}
// 获取商品详情页中的recommends数据
export function getRecommend(){
   return request({
     url:'/recommend'
   })
}


// ES5定义class
//  function Person(){}
//  ES6定义class
//  class Person{}

// 面向对象的封装思想
// 商品基本信息的封装
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    // this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.price = itemInfo.lowNowPrice;
  }
}

 // 店铺信息
export class Shop {
   constructor(shopInfo) {
     this.shopLogo = shopInfo.shopLogo;
     this.name =  shopInfo.name;
     this.cFans = shopInfo.cFans;
     this.cSells = shopInfo.cSells;
     this.score = shopInfo.score;
     this.cGoods = shopInfo.cGoods;
   }
}

// 商品参数信息
 export class GoodsParam {
   constructor(info,rule) {
   //  注意：images可能没有值（某些商品有，某些商品没有)
     this.image = info.images ? info.images[0] : '';
     this.infos = info.set;
     this.sizes = rule.tables;
   }
 }


