<template>
  <div class="wrapper" ref="wrapper">
<!--    1. 无论是否设置click:false，button都可以点击-->
<!--    <button @click="btnClick()">按钮</button>-->
<!--    2. 必须设置click:true，那么div才能监听点击事件-->
    <div @click="divClick()">div</div>
    <ul class="content">
      <li>11</li>
      <li>21</li>
      <li>31</li>
      <li>41</li>
      <li>51</li>
      <li>61</li>
      <li>71</li>
      <li>81</li>
      <li>91</li>
      <li>101</li>
      <li>111</li>
      <li>121</li>
      <li>131</li>
      <li>141</li>
      <li>151</li>
      <li>161</li>
      <li>171</li>
      <li>181</li>
      <li>191</li>
      <li>201</li>
      <li>211</li>
      <li>221</li>
      <li>231</li>
      <li>241</li>
      <li>251</li>
      <li>261</li>
      <li>271</li>
      <li>281</li>
      <li>291</li>
      <li>301</li>
      <li>311</li>
      <li>321</li>
      <li>331</li>
      <li>341</li>
      <li>351</li>
      <li>361</li>
      <li>371</li>
      <li>381</li>
      <li>391</li>
      <li>401</li>
      <li>411</li>
      <li>421</li>
      <li>431</li>
      <li>441</li>
      <li>451</li>
      <li>461</li>
      <li>471</li>
      <li>481</li>
      <li>491</li>
      <li>501</li>
      <li>511</li>
      <li>521</li>
      <li>531</li>
      <li>541</li>
      <li>551</li>
      <li>561</li>
      <li>571</li>
      <li>581</li>
      <li>591</li>
      <li>601</li>
      <li>611</li>
      <li>621</li>
      <li>631</li>
      <li>641</li>
      <li>651</li>
      <li>661</li>
      <li>671</li>
      <li>681</li>
      <li>691</li>
      <li>701</li>
      <li>711</li>
      <li>721</li>
      <li>731</li>
      <li>741</li>
      <li>751</li>
      <li>761</li>
      <li>771</li>
      <li>781</li>
      <li>791</li>
      <li>801</li>
      <li>811</li>
      <li>821</li>
      <li>831</li>
      <li>841</li>
      <li>851</li>
      <li>861</li>
      <li>871</li>
      <li>881</li>
      <li>891</li>
      <li>901</li>
      <li>911</li>
      <li>921</li>
      <li>931</li>
      <li>941</li>
      <li>951</li>
      <li>961</li>
      <li>971</li>
      <li>981</li>
      <li>991</li>
      <li>1001</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
name: "Category",
  data(){
    return {
      scroll: null
    }
  },
  methods:{
    btnClick(){
      console.log('btnClick');
    },
    divClick(){
      console.log('divClick');

    },
  },
  mounted() {
    //BScroll()函数中的参数：
    // 第一个参数：原生DOM对象。你可以直接写字符串，该插件内部会自动查找元素或者document.querySelector()
    // 第二个参数：
    this.scroll = new BScroll(document.querySelector('.wrapper'),{
      click:true,
      probeType:3,
      pullUpLoad:true
    });

    // console.log(this.scroll);
    // this.scroll.on('scroll', position => {
    // 	console.log(position); //实时位置
    // })
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多');
    })

  }
}
</script>

<style scoped>
.wrapper {
  height: 200px;
  background-color: yellow;
  /*overflow: hidden;*/

}
</style>
