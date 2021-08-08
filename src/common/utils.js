
export  function  debounce(func,delay){
  let timer = null
  return function(...args){
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this,args);
    },delay)
  }
}
// 时间戳转化成时间格式化的字符串
export  function formatDate(date,fmt){
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时  //如果要h/H区分12/24小时制的话，需要灵活改动
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
  };

  for (let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return fmt;
}
// 辅助上面的时间戳转化
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
